import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import OrgSettings from '@/components/features/organization/OrgSettings'

export default function OrgSettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Organization Settings" description="Manage your organization configuration." />
      <OrgSettings />
    </AppShell>
  )
}
