import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import RegisterForm from '@/components/features/auth/RegisterForm'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <RegisterForm onToggleLogin={() => navigate('/login')} />
    </AuthLayout>
  )
}
