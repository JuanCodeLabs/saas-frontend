import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import SubscriptionStatus from '@/components/features/billing/SubscriptionStatus'
import PricingTable from '@/components/features/billing/PricingTable'
import BillingHistory from '@/components/features/billing/BillingHistory'
import { mockPlans } from '@/lib/mockData'
import { toast } from 'sonner'

export default function BillingPage() {
  const handleSelectPlan = (plan: typeof mockPlans[number]) => {
    toast.success(`Selected ${plan.name} plan`)
  }

  return (
    <AppShell>
      <PageHeader title="Billing & Plans" description="Manage your subscription and billing." />

      <div className="space-y-6">
        <SubscriptionStatus />
        <PricingTable plans={mockPlans} onSelect={handleSelectPlan} />
        <BillingHistory />
      </div>
    </AppShell>
  )
}
