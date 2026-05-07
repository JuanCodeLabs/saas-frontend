import { supabase } from '@/lib/supabase'
import type { Plan } from '@/types/app.types'

class PlanRepository {
  async findById(id: string): Promise<Plan | null> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) return null
    return data
  }

  async findAll(): Promise<Plan[]> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('is_active', true)
      .order('price_monthly', { ascending: true })

    if (error) throw new Error(`PlanRepository.findAll: ${error.message}`)
    return data ?? []
  }

  async findByName(name: string): Promise<Plan | null> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('name', name)
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`PlanRepository.findByName: ${error.message}`)
    }
    return data
  }
}

export const planRepository = new PlanRepository()
