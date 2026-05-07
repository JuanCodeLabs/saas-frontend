import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'

const mockInvoices = [
  { id: 'inv_001', date: '2024-07-01', amount: 29.0, status: 'paid' },
  { id: 'inv_002', date: '2024-06-01', amount: 29.0, status: 'paid' },
  { id: 'inv_003', date: '2024-05-01', amount: 29.0, status: 'paid' },
  { id: 'inv_004', date: '2024-04-01', amount: 29.0, status: 'paid' },
]

export default function BillingHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <a href="#" className="text-primary hover:underline text-sm">
                    Download
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
