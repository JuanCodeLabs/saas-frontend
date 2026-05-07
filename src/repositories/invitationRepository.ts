import { supabase } from '@/lib/supabase'
import type { Invitation } from '@/types/app.types'

class InvitationRepository {
  async findByToken(token: string): Promise<Invitation | null> {
    const { data, error } = await supabase
      .from('invitations')
      .select('*, organizations(name, slug)')
      .eq('token', token)
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error) return null
    return data
  }

  async findByOrgId(orgId: string): Promise<Invitation[]> {
    const { data, error } = await supabase
      .from('invitations')
      .select('*, users(full_name, email)')
      .eq('organization_id', orgId)
      .is('accepted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`InvitationRepository.findByOrgId: ${error.message}`)
    return data ?? []
  }

  async create(
    orgId: string,
    email: string,
    role: 'admin' | 'member' | 'viewer',
    invitedBy: string
  ): Promise<Invitation> {
    const { data, error } = await supabase
      .from('invitations')
      .insert({
        organization_id: orgId,
        email,
        role,
        invited_by: invitedBy,
      })
      .select('*')
      .single()

    if (error) throw new Error(`InvitationRepository.create: ${error.message}`)
    return data
  }

  async accept(token: string): Promise<Invitation | null> {
    const { data, error } = await supabase
      .from('invitations')
      .update({ accepted_at: new Date().toISOString() })
      .eq('token', token)
      .select('*')
      .single()

    if (error) throw new Error(`InvitationRepository.accept: ${error.message}`)
    return data
  }

  async revoke(id: string): Promise<void> {
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`InvitationRepository.revoke: ${error.message}`)
  }
}

export const invitationRepository = new InvitationRepository()
