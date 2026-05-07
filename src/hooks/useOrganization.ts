import { useQuery } from '@tanstack/react-query'
import { organizationService } from '@/services/organizationService'
import { useAuthStore } from '@/stores/authStore'
import { useOrgStore } from '@/stores/orgStore'
import type { Organization } from '@/types/app.types'

export function useOrganizations() {
  const { user } = useAuthStore()

  return useQuery<Organization[]>({
    queryKey: ['organizations', user?.id],
    queryFn: () => organizationService.getOrgsForUser(user!.id),
    enabled: !!user,
  })
}

export function useOrganizationBySlug(slug: string) {
  return useQuery<Organization | null>({
    queryKey: ['organization', 'slug', slug],
    queryFn: () => organizationService.getOrgBySlug(slug),
    enabled: !!slug,
  })
}

export function useOrganization() {
  const { activeOrg, setActiveOrg } = useOrgStore()

  const switchOrg = (org: Organization | null) => {
    setActiveOrg(org)
  }

  return { activeOrg, switchOrg }
}
