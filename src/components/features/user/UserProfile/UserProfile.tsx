import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/authService'
import { toast } from 'sonner'

export default function UserProfile() {
  const { user, setUser } = useAuthStore()
  const [name, setName] = useState(user?.full_name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')

  const handleSave = async () => {
    if (!user) return
    try {
      await authService.updateUserProfile({ full_name: name })
      setUser({ ...user, full_name: name })
      toast.success('Profile updated')
    } catch {
      toast.error('Failed to update profile')
    }
  }

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar size="lg" fallback={user.full_name?.charAt(0) ?? 'U'} />
          <div>
            <p className="font-medium">{user.full_name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
