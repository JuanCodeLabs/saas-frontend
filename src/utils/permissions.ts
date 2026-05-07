import type { User, OrgMember, Permission, OrgRole, UserRole } from '@/types/app.types'

const rolePermissions: Record<OrgRole, Permission[]> = {
  owner: ['org:manage', 'org:delete', 'members:invite', 'members:remove', 'billing:manage', 'settings:edit'],
  admin: ['org:manage', 'members:invite', 'members:remove', 'settings:edit'],
  member: ['settings:edit'],
  viewer: [],
}

const globalPermissions: Record<UserRole, Permission[]> = {
  admin: ['org:manage', 'org:delete', 'members:invite', 'members:remove', 'billing:manage', 'settings:edit'],
  user: [],
}

export function checkPermission(
  user: User | null,
  memberRecord: OrgMember | null,
  permission: Permission
): boolean {
  if (!user) return false

  if (user.role === 'admin' && globalPermissions.admin.includes(permission)) {
    return true
  }

  if (memberRecord && rolePermissions[memberRecord.role].includes(permission)) {
    return true
  }

  return false
}
