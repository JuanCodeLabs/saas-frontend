import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Organization } from '@/types/app.types'

interface OrgState {
  activeOrg: Organization | null
  setActiveOrg: (org: Organization | null) => void
}

export const useOrgStore = create<OrgState>()(
  persist(
    (set) => ({
      activeOrg: null,
      setActiveOrg: (org) => set({ activeOrg: org }),
    }),
    { name: 'org-storage' }
  )
)
