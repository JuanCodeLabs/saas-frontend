import { useQuery } from '@tanstack/react-query'
import { memberRepository } from '@/repositories/memberRepository'
import { useAuthStore } from '@/stores/authStore'
import { useOrgStore } from '@/stores/orgStore'
import { checkPermission } from '@/utils/permissions'
import type { Permission } from '@/types/app.types'

export function usePermissions() {
  const { user } = useAuthStore()
  const { activeOrg } = useOrgStore()

  const { data: memberRecord } = useQuery({
    queryKey: ['member', activeOrg?.id, user?.id],
    queryFn: () => {
      if (!activeOrg || !user) return null
      return memberRepository.findByOrgAndUser(activeOrg.id, user.id)
    },
    enabled: !!activeOrg && !!user,
    staleTime: 1000 * 60 * 5,
  })

  const can = (permission: Permission): boolean => {
    if (!user) return false
    return checkPermission(user, memberRecord ?? null, permission)
  }

  return { can, memberRecord }
}
