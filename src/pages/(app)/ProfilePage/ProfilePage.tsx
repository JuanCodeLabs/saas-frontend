import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import UserProfile from '@/components/features/user/UserProfile'

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHeader title="Profile" description="Manage your profile information." />
      <UserProfile />
    </AppShell>
  )
}
