import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import LoginForm from '@/components/features/auth/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <LoginForm
        onToggleRegister={() => navigate('/register')}
        onForgotPassword={() => navigate('/forgot-password')}
      />
    </AuthLayout>
  )
}
