import { organizationRepository } from '@/repositories/organizationRepository'
import { memberRepository } from '@/repositories/memberRepository'
import { invitationRepository } from '@/repositories/invitationRepository'
import type { Organization, OrgMember } from '@/types/app.types'

class OrganizationService {
  async getOrgsForUser(userId: string): Promise<Organization[]> {
    return organizationRepository.findByUserId(userId)
  }

  async getOrgBySlug(slug: string): Promise<Organization | null> {
    return organizationRepository.findBySlug(slug)
  }

  async getOrgMembers(orgId: string): Promise<OrgMember[]> {
    return memberRepository.findByOrgId(orgId)
  }

  async createOrganization(
    userId: string,
    name: string,
    planId: string
  ): Promise<Organization> {
    const org = await organizationRepository.create({
      name,
      plan_id: planId,
      owner_id: userId,
    })

    await memberRepository.create(org.id, userId, 'owner')
    return org
  }

  async inviteMember(
    orgId: string,
    email: string,
    role: 'admin' | 'member' | 'viewer',
    invitedBy: string
  ) {
    return invitationRepository.create(orgId, email, role, invitedBy)
  }

  async updateMemberRole(memberId: string, role: 'owner' | 'admin' | 'member' | 'viewer') {
    return memberRepository.updateRole(memberId, role)
  }

  async removeMember(memberId: string) {
    return memberRepository.remove(memberId)
  }

  async acceptInvitation(token: string, userId: string) {
    const invitation = await invitationRepository.findByToken(token)
    if (!invitation) throw new Error('Invalid or expired invitation')

    await memberRepository.create(
      invitation.organization_id,
      userId,
      invitation.role,
      invitation.invited_by
    )

    await invitationRepository.accept(token)
  }
}

export const organizationService = new OrganizationService()
