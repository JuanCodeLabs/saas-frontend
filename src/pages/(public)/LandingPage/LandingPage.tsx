import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with optimized performance that scales with your team.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and SOC 2 compliance to keep your data safe.',
  },
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description: 'Real-time insights and custom reports to drive better decisions.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">SaaSify</div>
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

      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Build faster with{' '}
          <span className="text-primary">SaaSify</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          The all-in-one platform for teams that want to move fast. Manage users, organizations, and billing in one place.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg">
              Sign Up Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-2">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="#">Features</Link></li>
                <li><Link to="#">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#">About</Link></li>
                <li><Link to="#">Blog</Link></li>
                <li><Link to="#">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#">Privacy</Link></li>
                <li><Link to="#">Terms</Link></li>
                <li><Link to="#">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#">Twitter</Link></li>
                <li><Link to="#">GitHub</Link></li>
                <li><Link to="#">Discord</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; 2026 SaaSify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
