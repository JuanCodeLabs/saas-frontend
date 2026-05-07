import { supabase } from '@/lib/supabase'
import type { OrgMember } from '@/types/app.types'

class MemberRepository {
  async findById(id: string): Promise<OrgMember | null> {
    const { data, error } = await supabase
      .from('organization_members')
      .select('*, users(id, email, full_name, avatar_url)')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  }

  async findByOrgId(orgId: string): Promise<OrgMember[]> {
    const { data, error } = await supabase
      .from('organization_members')
      .select('*, users(id, email, full_name, avatar_url)')
      .eq('organization_id', orgId)
      .order('joined_at', { ascending: false })

    if (error) throw new Error(`MemberRepository.findByOrgId: ${error.message}`)
    return data ?? []
  }

  async findByUserId(userId: string): Promise<OrgMember[]> {
    const { data, error } = await supabase
      .from('organization_members')
      .select('*, users(id, email, full_name, avatar_url)')
      .eq('user_id', userId)

    if (error) throw new Error(`MemberRepository.findByUserId: ${error.message}`)
    return data ?? []
  }

  async findByOrgAndUser(orgId: string, userId: string): Promise<OrgMember | null> {
    const { data, error } = await supabase
      .from('organization_members')
      .select('*, users(id, email, full_name, avatar_url)')
      .eq('organization_id', orgId)
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`MemberRepository.findByOrgAndUser: ${error.message}`)
    }
    return data
  }

  async create(
    orgId: string,
    userId: string,
    role: 'owner' | 'admin' | 'member' | 'viewer',
    invitedBy?: string
  ): Promise<OrgMember> {
    const { data, error } = await supabase
      .from('organization_members')
      .insert({
        organization_id: orgId,
        user_id: userId,
        role,
        invited_by: invitedBy ?? null,
        invited_at: invitedBy ? new Date().toISOString() : null,
        joined_at: new Date().toISOString(),
      })
      .select('*, users(id, email, full_name, avatar_url)')
      .single()

    if (error) throw new Error(`MemberRepository.create: ${error.message}`)
    return data
  }

  async updateRole(id: string, role: 'owner' | 'admin' | 'member' | 'viewer'): Promise<OrgMember> {
    const { data, error } = await supabase
      .from('organization_members')
      .update({ role })
      .eq('id', id)
      .select('*, users(id, email, full_name, avatar_url)')
      .single()

    if (error) throw new Error(`MemberRepository.updateRole: ${error.message}`)
    return data
  }

  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from('organization_members')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`MemberRepository.remove: ${error.message}`)
  }

  async countByOrgId(orgId: string): Promise<number> {
    const { count, error } = await supabase
      .from('organization_members')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', orgId)

    if (error) throw new Error(`MemberRepository.countByOrgId: ${error.message}`)
    return count ?? 0
  }
}

export const memberRepository = new MemberRepository()
