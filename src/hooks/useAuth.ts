import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/authService'
import type { User } from '@/types/app.types'

export function useAuth() {
  const { user, isAuthenticated, setUser, clearAuth } = useAuthStore()
  const queryClient = useQueryClient()

  const { data: currentUser, isLoading } = useQuery<User | null>({
    queryKey: ['auth', 'currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
    }
  }, [currentUser, setUser])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const user = await authService.getCurrentUser()
        if (user) setUser(user)
      } else {
        clearAuth()
        queryClient.clear()
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, clearAuth, queryClient])

  const logout = async () => {
    await authService.signOut()
    clearAuth()
    queryClient.clear()
  }

  return { user, isAuthenticated, isLoading, logout, setUser }
}
