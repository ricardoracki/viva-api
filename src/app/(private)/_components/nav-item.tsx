import Link, { LinkProps } from 'next/link'

import { Button } from '@/components/button'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

type NavItemProps = LinkProps & {
  label: string
  Icon: LucideIcon
  active?: boolean
}

export const NavItem = ({
  Icon,
  label,
  active = false,
  ...props
}: NavItemProps) => (
  <Button
    className="w-full text-sm px-3 h-32px flex items-center gap-3 justify-start bg-transparent transition-all"
    data-active={active}
    asChild
  >
    <Link {...props}>
      <Icon
        className={cn('text-gray-400', { 'text-primary': active })}
        size={22}
      />
      <span className={cn('text-gray-300', { 'text-text': active })}>
        {label}
      </span>
    </Link>
  </Button>
)
