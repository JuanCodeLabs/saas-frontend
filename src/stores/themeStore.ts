import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/types/app.types'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
        const root = document.documentElement
        if (theme === 'dark') {
          root.classList.add('dark')
        } else if (theme === 'light') {
          root.classList.remove('dark')
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          prefersDark ? root.classList.add('dark') : root.classList.remove('dark')
        }
      },
    }),
    { name: 'theme-storage' }
  )
)
