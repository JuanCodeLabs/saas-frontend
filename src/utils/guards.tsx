import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useOrgStore } from '@/stores/orgStore'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

export function RequireOrg({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const { activeOrg } = useOrgStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!activeOrg) return <Navigate to="/app" replace />
  return children
}
