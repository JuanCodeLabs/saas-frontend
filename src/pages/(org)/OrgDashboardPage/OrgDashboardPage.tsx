import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Users, FileText, Activity } from 'lucide-react'

const orgStats = [
  { label: 'Members', value: '12', icon: Users },
  { label: 'Projects', value: '8', icon: FileText },
  { label: 'Active Today', value: '7', icon: Activity },
]

const recentMembers = [
  { name: 'Demo User', email: 'demo@example.com', role: 'owner', joined: 'Jan 15, 2024' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'member', joined: 'Feb 20, 2024' },
  { name: 'Bob Wilson', email: 'bob@example.com', role: 'viewer', joined: 'Apr 10, 2024' },
]

export default function OrgDashboardPage() {
  return (
    <AppShell>
      <PageHeader title="Acme Corp" description="Organization overview" />

      <div className="grid gap-4 md:grid-cols-3">
        {orgStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMembers.map((member) => (
              <div key={member.email} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-muted px-2 py-1 rounded">{member.role}</span>
                  <p className="text-xs text-muted-foreground mt-1">{member.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  )
}
