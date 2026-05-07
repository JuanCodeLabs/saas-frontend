import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
  { label: 'Organizations', value: '56', icon: Building2, change: '+3%' },
  { label: 'Revenue', value: '$48,290', icon: DollarSign, change: '+18%' },
  { label: 'Growth', value: '24.5%', icon: TrendingUp, change: '+4.2%' },
]

const recentActivity = [
  { id: 1, action: 'New user registered', user: 'alice@example.com', time: '2 min ago' },
  { id: 2, action: 'Subscription upgraded', user: 'bob@example.com', time: '15 min ago' },
  { id: 3, action: 'Organization created', user: 'carol@example.com', time: '1 hour ago' },
  { id: 4, action: 'Payment received', user: 'dave@example.com', time: '3 hours ago' },
  { id: 5, action: 'New member invited', user: 'eve@example.com', time: '5 hours ago' },
]

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader title="Dashboard" description="Welcome back, here's what's happening." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  )
}
