import type { Plan } from '@/types/app.types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

interface PricingTableProps {
  plans: Plan[]
  onSelect?: (plan: Plan) => void
  currentPlanId?: string
}

function formatPrice(cents: number): string {
  if (cents === 0) return 'Free'
  return `$${(cents / 100).toFixed(2)}`
}

export default function PricingTable({ plans, onSelect, currentPlanId }: PricingTableProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => {
        const isCurrent = plan.id === currentPlanId
        return (
          <Card key={plan.id} className={`flex flex-col ${isCurrent ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.display_name}
                {plan.price_monthly === 0 && <Badge variant="secondary">Free</Badge>}
                {isCurrent && <Badge>Current</Badge>}
              </CardTitle>
              <CardDescription>{plan.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-4xl font-bold">{formatPrice(plan.price_monthly)}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => {
                  const text = typeof feature === 'string' ? feature : (feature as Record<string, unknown>).text as string ?? JSON.stringify(feature)
                  return (
                    <li key={i} className="flex items-center text-sm">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {text}
                    </li>
                  )
                })}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.price_monthly === 0 ? 'outline' : 'default'}
                disabled={isCurrent}
                onClick={() => onSelect?.(plan)}
              >
                {plan.price_monthly === 0 ? 'Get Started' : isCurrent ? 'Current Plan' : 'Subscribe'}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
