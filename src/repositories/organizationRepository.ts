import { supabase } from '@/lib/supabase'
import type { Organization, CreateOrgInput, UpdateOrgInput } from '@/types/app.types'

class OrganizationRepository {
  async findById(id: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*, plans(*)')
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) return null
    return data
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*, plans(*)')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single()

    if (error) return null
    return data
  }

  async findByUserId(userId: string): Promise<Organization[]> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*, plans(*), organization_members!inner(*)')
      .eq('organization_members.user_id', userId)
      .is('organizations.deleted_at', null)

    if (error) throw new Error(`OrganizationRepository.findByUserId: ${error.message}`)
    return data ?? []
  }

  async findAll(): Promise<Organization[]> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*, plans(*)')
      .is('deleted_at', null)

    if (error) throw new Error(`OrganizationRepository.findAll: ${error.message}`)
    return data ?? []
  }

  async create(input: CreateOrgInput): Promise<Organization> {
    const slug = input.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const { data, error } = await supabase
      .from('organizations')
      .insert({ ...input, slug })
      .select('*, plans(*)')
      .single()

    if (error) throw new Error(`OrganizationRepository.create: ${error.message}`)
    return data
  }

  async update(id: string, input: UpdateOrgInput): Promise<Organization> {
    const { data, error } = await supabase
      .from('organizations')
      .update(input)
      .eq('id', id)
      .select('*, plans(*)')
      .single()

    if (error) throw new Error(`OrganizationRepository.update: ${error.message}`)
    return data
  }

  async softDelete(id: string): Promise<void> {
    const { error } = await supabase
      .from('organizations')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw new Error(`OrganizationRepository.softDelete: ${error.message}`)
  }

  async hardDelete(id: string): Promise<void> {
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`OrganizationRepository.hardDelete: ${error.message}`)
  }
}

export const organizationRepository = new OrganizationRepository()
