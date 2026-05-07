import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { OAuthButtons } from '@/components/features/auth/OAuthButtons'
import { useAuthStore } from '@/stores/authStore'
import { mockUser } from '@/lib/mockData'

interface RegisterFormProps {
  onToggleLogin?: () => void
}

export default function RegisterForm({ onToggleLogin }: RegisterFormProps) {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!name || !email || !password) return

    useAuthStore.getState().setUser({ ...mockUser, full_name: name, email })
    navigate('/app')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <p className="text-muted-foreground">Get started with your free account</p>
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

      <Input name="name" type="text" label="Name" placeholder="John Doe" required />
      <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
      <Input name="password" type="password" label="Password" placeholder="••••••••" required />

      <Button type="submit" className="w-full" size="lg">
        Create Account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button type="button" className="text-primary hover:underline" onClick={onToggleLogin}>
          Sign in
        </button>
      </p>
    </form>
  )
}
