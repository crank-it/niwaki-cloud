import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-all duration-200 ease-out disabled:opacity-40 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-stone-800 text-white hover:bg-stone-900 active:bg-black',
      secondary: 'border border-stone-300 text-stone-700 hover:bg-stone-200 active:bg-stone-300',
      ghost: 'text-stone-600 hover:text-stone-900 hover:bg-stone-100',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
