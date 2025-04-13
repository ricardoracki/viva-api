import { Button, ButtonProps } from './button'

import { HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utils/cn'

const Pagination = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) => (
  <ul className={cn('flex gap-2', className)} {...props}>
    {children}
  </ul>
)

const Item = ({
  selected,
  className,
  asChild = false,
  ...props
}: ButtonProps & { selected?: boolean }) => {
  const Comp = asChild ? Slot : Button

  return (
    <li>
      <Comp
        variant={selected ? 'outline' : 'ghost'}
        size="icon"
        className={cn('text-sm border-gray-700', className)}
        {...props}
      />
    </li>
  )
}

const Previous = (props: ButtonProps) => <Item {...props}>&lt;</Item>
const Next = (props: ButtonProps) => <Item {...props}>&gt;</Item>

Pagination.Item = Item
Pagination.Previous = Previous
Pagination.Next = Next

export { Pagination }
