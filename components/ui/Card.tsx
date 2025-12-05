import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-white border border-stone-200 rounded-lg p-6 shadow-sm', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mb-4', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn('text-xl font-light text-stone-800 tracking-wide', className)} {...props}>
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

export const CardSubtitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-xs text-stone-500 tracking-widest uppercase mt-1', className)} {...props}>
        {children}
      </p>
    )
  }
)

CardSubtitle.displayName = 'CardSubtitle'

export const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('text-stone-600', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mt-4 pt-4 border-t border-stone-100', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'
