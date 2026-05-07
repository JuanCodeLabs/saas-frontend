import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

interface Column<T = any> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T = any> {
  columns: Column<T>[]
  data: T[]
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T = any>({ columns, data }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => {
        if (prev === 'asc') return 'desc'
        if (prev === 'desc') return null
        return null
      })
      if (sortDirection === 'desc') {
        setSortKey(null)
      }
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a: any, b: any) => {
    if (!sortKey || !sortDirection) return 0

    const aVal = a[sortKey]
    const bVal = b[sortKey]

    if (aVal == null) return 1
    if (bVal == null) return -1

    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />
    if (sortDirection === 'asc') return <ArrowUp className="ml-2 h-4 w-4" />
    if (sortDirection === 'desc') return <ArrowDown className="ml-2 h-4 w-4" />
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  const renderCell = (column: Column<T>, row: T) => {
    if (column.render) {
      return column.render(row)
    }

    const value = (row as any)[column.key]

    if (column.key.toLowerCase().includes('status')) {
      return (
        <Badge variant={value === 'active' || value === 'completed' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    }

    return value ?? '—'
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="cursor-pointer select-none"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.header}
                  {getSortIcon(column.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row: any, index) => (
              <TableRow key={(row.id ?? row.key ?? index) as React.Key}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{renderCell(column, row)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
