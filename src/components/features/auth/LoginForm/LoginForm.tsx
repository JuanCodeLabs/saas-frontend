import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { OAuthButtons } from '@/components/features/auth/OAuthButtons'
import { useAuthStore } from '@/stores/authStore'
import { mockUser } from '@/lib/mockData'

interface LoginFormProps {
  onToggleRegister?: () => void
  onForgotPassword?: () => void
}

export default function LoginForm({ onToggleRegister, onForgotPassword }: LoginFormProps) {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) return

    useAuthStore.getState().setUser(mockUser)
    navigate('/app')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
      <Input name="password" type="password" label="Password" placeholder="••••••••" required />

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={onForgotPassword}
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Sign In
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <button type="button" className="text-primary hover:underline" onClick={onToggleRegister}>
          Sign up
        </button>
      </p>
    </form>
  )
}
