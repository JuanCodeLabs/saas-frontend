import { forwardRef } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
  description?: string
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex items-start space-x-3">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
            <Check className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
