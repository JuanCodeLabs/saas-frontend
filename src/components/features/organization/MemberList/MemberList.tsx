import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { mockMembers } from '@/lib/mockData'
import { formatDate } from '@/utils/formatters'

const roleColors: Record<string, string> = {
  owner: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  admin: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  member: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
}

export default function MemberList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockMembers.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar size="sm" fallback={member.user_id.slice(0, 1).toUpperCase()} />
                <div>
                  <p className="font-medium">{member.user_id}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={roleColors[member.role]}>
                {member.role}
              </Badge>
            </TableCell>
            <TableCell>{member.joined_at ? formatDate(member.joined_at) : '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
