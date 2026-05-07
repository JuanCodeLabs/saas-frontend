import { supabase } from '@/lib/supabase'
import { userRepository } from '@/repositories/userRepository'
import { organizationRepository } from '@/repositories/organizationRepository'
import { memberRepository } from '@/repositories/memberRepository'
import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/types/app.types'

class AuthService {
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (error) throw error
    return data
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    })

    if (error) throw error
    return data
  }

  async signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    })

    if (error) throw error
    return data
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/app/settings`,
    })

    if (error) throw error
  }

  async updateUserProfile(updates: { full_name?: string; avatar_url?: string }) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    await supabase.auth.updateUser({ data: updates })
    return userRepository.update(user.id, updates)
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    return userRepository.findById(user.id)
  }

  async syncSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      useAuthStore.getState().clearAuth()
      return null
    }

    const user = await userRepository.findById(session.user.id)
    if (user) {
      useAuthStore.getState().setUser(user)
    }
    return user
  }

  async createOrgAndAddMember(userId: string, orgName: string, planId: string) {
    const org = await organizationRepository.create({
      name: orgName,
      plan_id: planId,
      owner_id: userId,
    })

    await memberRepository.create(org.id, userId, 'owner')
    return org
  }
}

export const authService = new AuthService()
