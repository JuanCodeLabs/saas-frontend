import { useThemeStore } from '@/stores/themeStore'

export function useTheme() {
  const { theme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return { theme, setTheme, toggleTheme }
}
