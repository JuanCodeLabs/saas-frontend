import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success('Password reset link sent to your email')
    setSubmitted(true)
  }

  return (
    <AuthLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Reset password</h2>
        <p className="text-muted-foreground">
          {submitted
            ? 'Check your email for the reset link.'
            : "Enter your email and we'll send you a reset link."}
        </p>

        {submitted ? (
          <Button className="w-full" onClick={() => navigate('/login')}>
            Back to Sign In
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
