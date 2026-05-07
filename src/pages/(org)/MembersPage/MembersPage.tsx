import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import MemberList from '@/components/features/organization/MemberList'
import InviteForm from '@/components/features/organization/InviteForm'

export default function MembersPage() {
  return (
    <AppShell>
      <PageHeader title="Members" description="Manage your organization members." />

      <div className="space-y-6">
        <InviteForm />
        <MemberList />
      </div>
    </AppShell>
  )
}
