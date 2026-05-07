import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function OrgSettings() {
  const [name, setName] = useState('Acme Corp')
  const [slug, setSlug] = useState('acme-corp')

  const handleSave = () => {
    toast.success('Organization settings updated')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input label="Organization Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
          helperText="Used in your organization URL"
        />
      </CardContent>
      <CardFooter className="gap-3">
        <Button onClick={handleSave}>Save Changes</Button>
        <Button variant="destructive">Delete Organization</Button>
      </CardFooter>
    </Card>
  )
}
