import { memberRepository } from '@/repositories/memberRepository'
import { userRepository } from '@/repositories/userRepository'
import { checkPermission } from '@/utils/permissions'
import type { Permission } from '@/types/app.types'

class PermissionService {
  async check(
    userId: string,
    orgId: string,
    permission: Permission
  ): Promise<boolean> {
    const user = await userRepository.findById(userId)
    if (!user) return false

    if (user.role === 'admin') return true

    const memberRecord = await memberRepository.findByOrgAndUser(orgId, userId)
    return checkPermission(user, memberRecord, permission)
  }

  async getUserRole(userId: string, orgId: string): Promise<string | null> {
    const member = await memberRepository.findByOrgAndUser(orgId, userId)
    return member?.role ?? null
  }

  async canManageBilling(userId: string, orgId: string): Promise<boolean> {
    return this.check(userId, orgId, 'billing:manage')
  }

  async canInviteMembers(userId: string, orgId: string): Promise<boolean> {
    return this.check(userId, orgId, 'members:invite')
  }

  async canRemoveMembers(userId: string, orgId: string): Promise<boolean> {
    return this.check(userId, orgId, 'members:remove')
  }

  async canManageOrg(userId: string, orgId: string): Promise<boolean> {
    return this.check(userId, orgId, 'org:manage')
  }

  async canDeleteOrg(userId: string, orgId: string): Promise<boolean> {
    return this.check(userId, orgId, 'org:delete')
  }
}

export const permissionService = new PermissionService()
