import { mockPlans } from '@/lib/mockData'
import PricingTable from '@/components/features/billing/PricingTable'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            SaaSify
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that fits your needs. Upgrade or downgrade anytime.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <PricingTable plans={mockPlans} />
      </section>
    </div>
  )
}
