import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [name, setName] = useState('Demo User')
  const [email, setEmail] = useState('demo@example.com')
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)

  const handleSave = () => {
    toast.success('Settings saved')
  }

  return (
    <AppShell>
      <PageHeader title="Settings" description="Manage your account settings." />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Profile</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Notifications</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Switch
              label="Email notifications"
              description="Receive email updates about your account"
              checked={emailNotifs}
              onCheckedChange={setEmailNotifs}
            />
            <Separator />
            <Switch
              label="Push notifications"
              description="Receive push notifications in your browser"
              checked={pushNotifs}
              onCheckedChange={setPushNotifs}
            />
            <Separator />
            <Switch
              label="Marketing emails"
              description="Receive emails about new features and updates"
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </CardContent>
        </Card>

        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </AppShell>
  )
}
