import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

function Avatar({ className, size, src, alt = '', fallback, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ size, className }))} {...props}>
      {src && <AvatarPrimitive.Image className="aspect-square h-full w-full" src={src} alt={alt} />}
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
        {fallback || <UserIcon />}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-1/2 w-1/2"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  )
}

export { Avatar, avatarVariants }
