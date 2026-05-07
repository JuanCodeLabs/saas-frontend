import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select, SelectItem } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function InviteForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')

  const handleInvite = () => {
    if (!email) return
    toast.success(`Invite sent to ${email}`)
    setEmail('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleInvite()
          }}
          className="flex gap-3 items-end"
        >
          <div className="flex-1">
            <Input
              label="Email"
              type="email"
              placeholder="colleague@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-40">
            <Select value={role} onValueChange={setRole} label="Role">
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </Select>
          </div>
          <Button type="submit">Invite</Button>
        </form>
      </CardContent>
    </Card>
  )
}
