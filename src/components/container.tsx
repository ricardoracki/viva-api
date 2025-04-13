import { HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utils/cn'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean
  center?: boolean
}

export const Container = ({
  className,
  asChild,
  center = false,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        'h-screen bg-background overflow-auto',
        { 'flex items-center justify-center': center },
        className
      )}
      {...props}
    />
  )
}
