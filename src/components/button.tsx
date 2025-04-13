import { ButtonHTMLAttributes, Ref, forwardRef } from 'react'

import { Loading } from './loading'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utils/cn'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'default'
    | 'outline'
    | 'ghost'
    | 'primary'
    | 'danger'
    | 'link'
    | 'warning'
  size?: 'default' | 'icon' | 'icon-sm'
  loading?: boolean
  asChild?: boolean
}

const Ld = (
  <Loading>
    <Loading.Spinner />
  </Loading>
)

export const Btn = (
  {
    className,
    variant = 'default',
    size = 'default',
    loading = false,
    disabled,
    children,
    asChild,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement> | undefined
) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      disabled={disabled || loading}
      children={loading ? Ld : children}
      className={cn(
        'transition-all ease-in-out cursor-pointer opacity-90 hover:opacity-100 rounded-md flex items-center justify-center h-9',
        {
          'bg-zinc-900 text-text hover:bg-zinc-700': variant === 'default',
          ' text-text hover:bg-zinc-200/5 border border-zinc-300':
            variant === 'outline',
          'bg-transparent text-text hover:bg-zinc-200/5 ': variant === 'ghost',
          'bg-transparent text-text hover:underline': variant === 'link',
          'bg-purple-500 text-text hover:bg-purple-600': variant === 'primary',
          'bg-red-600 text-text hover:bg-red-500': variant === 'danger',
          'bg-amber-600 text-text hover:bg-amber-500': variant === 'warning',
          'py-2 rounded-md w-full': size === 'default',
          'w-9 ': size === 'icon',
          'w-6 h-6 ': size === 'icon-sm',
          'pointer-events-none opacity-50': loading || disabled,
        },
        className
      )}
      {...props}
    />
  )
}

export const Button = forwardRef(Btn)
