import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useSubscription } from '@/hooks/useSubscription'
import { formatDate } from '@/utils/formatters'

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  canceled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  past_due: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  trialing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  paused: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
}

export default function SubscriptionStatus() {
  const { data: subscription, isLoading } = useSubscription()

  if (isLoading) return <div className="h-32 animate-pulse rounded-lg bg-muted" />
  if (!subscription) return null

  const plan = (subscription as any).plans

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Current Subscription
          <Badge className={statusColors[subscription.status]}>
            {subscription.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="font-medium">{plan?.display_name ?? 'Unknown'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-medium">${((plan?.price_monthly ?? 0) / 100).toFixed(2)}/mo</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Period ends</p>
            <p className="font-medium">{formatDate(subscription.current_period_end)}</p>
          </div>
          {subscription.cancel_at_period_end && (
            <Badge variant="destructive">Cancels at period end</Badge>
          )}
        </div>
        {subscription.cancel_at_period_end && (
          <Button variant="outline" size="sm">
            Reactivate
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
