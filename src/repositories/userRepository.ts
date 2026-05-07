import { supabase } from '@/lib/supabase'
import type { User, UpdateUserInput } from '@/types/app.types'

class UserRepository {
  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*, plans(*)')
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) throw new Error(`UserRepository.findById: ${error.message}`)
    return data
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*, plans(*)')
      .eq('email', email)
      .is('deleted_at', null)
      .single()

    if (error && error.code !== 'PGRST116') throw new Error(`UserRepository.findByEmail: ${error.message}`)
    return data
  }

  async findAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*, plans(*)')
      .is('deleted_at', null)

    if (error) throw new Error(`UserRepository.findAll: ${error.message}`)
    return data ?? []
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(input)
      .eq('id', id)
      .select('*, plans(*)')
      .single()

    if (error) throw new Error(`UserRepository.update: ${error.message}`)
    return data
  }

  async softDelete(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw new Error(`UserRepository.softDelete: ${error.message}`)
  }

  async hardDelete(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`UserRepository.hardDelete: ${error.message}`)
  }
}

export const userRepository = new UserRepository()
