import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { AlertCircle, CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from 'lucide-react'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        info: 'border-info/50 text-info dark:border-info [&>svg]:text-info',
        success: 'border-success/50 text-success dark:border-success [&>svg]:text-success',
        warning: 'border-warning/50 text-warning dark:border-warning [&>svg]:text-warning',
        error: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

const alertIcons: Record<NonNullable<VariantProps<typeof alertVariants>['variant']>, LucideIcon> = {
  info: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  description?: string
  icon?: LucideIcon
}

function Alert({ className, variant = 'info', title, description, icon: Icon, ...props }: AlertProps) {
  const resolvedVariant = variant ?? 'info'
  const IconComponent = Icon || alertIcons[resolvedVariant]
  return (
    <div role="alert" className={cn(alertVariants({ variant, className }))} {...props}>
      <IconComponent className="h-4 w-4" />
      {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
      {description && <div className="text-sm [&_p]:leading-relaxed">{description}</div>}
    </div>
  )
}

export { Alert, alertVariants }
