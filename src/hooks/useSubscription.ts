import { useQuery } from '@tanstack/react-query'
import { subscriptionRepository } from '@/repositories/subscriptionRepository'
import { useAuthStore } from '@/stores/authStore'
import { useOrgStore } from '@/stores/orgStore'
import type { Subscription } from '@/types/app.types'

export function useSubscription() {
  const { user } = useAuthStore()
  const { activeOrg } = useOrgStore()

  return useQuery<Subscription | null>({
    queryKey: ['subscription', activeOrg?.id ?? user?.id],
    queryFn: async () => {
      if (activeOrg) {
        return subscriptionRepository.findByOrgId(activeOrg.id)
      }
      if (user) {
        return subscriptionRepository.findByUserId(user.id)
      }
      return null
    },
    enabled: !!user || !!activeOrg,
  })
}
