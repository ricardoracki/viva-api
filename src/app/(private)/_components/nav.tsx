'use client'

import {
  Bell,
  BookOpen,
  CalendarCog,
  ChevronLeft,
  Cog,
  House,
  Tags,
  Users2,
} from 'lucide-react'

import { Button } from '@/components/button'
import { NavItem } from './nav-item'
import { cn } from '@/utils/cn'
import { useNavbar } from '@/hooks/use-navbar'
import { usePathname } from 'next/navigation'

export const Nav = () => {
  const pathname = usePathname()
  const { isOpen, close } = useNavbar()

  return (
    <nav
      className={cn(
        'hidden relative w-0 overflow-x-hidden lg:flex h-full lg:w-[216px] border border-transparent border-r-gray-700 flex-col lg:p-3 gap-2 transition-all',
        {
          'absolute top-0 bottom-0 left-0 z-10 bg-zinc-800 p-3 w-fit flex':
            isOpen,
        }
      )}
    >
      <Button
        size="icon"
        variant="outline"
        className="lg:hidden absolute top-3 right-3 z-10"
        onClick={close}
      >
        <ChevronLeft />
      </Button>

      <NavItem
        label="Dashboard"
        Icon={House}
        href="/dashboard"
        active={pathname === '/dashboard'}
        onClick={close}
      />
      <NavItem
        label="Eventos"
        Icon={CalendarCog}
        href="/events"
        active={pathname === '/events'}
        onClick={close}
      />
      <NavItem
        label="Estudos"
        Icon={BookOpen}
        href="/studies"
        active={pathname === '/studies'}
        onClick={close}
      />
      <NavItem
        label="Notificações"
        Icon={Bell}
        href="/notifications"
        active={pathname === '/notifications'}
        onClick={close}
      />
      <NavItem
        label="Grupos & Permissões"
        Icon={Tags}
        href="/groups"
        active={pathname === '/groups'}
        onClick={close}
      />
      <NavItem
        label="Usuários"
        Icon={Users2}
        href="/users"
        active={pathname === '/users'}
        onClick={close}
      />
      <div className="flex-1" />
      <NavItem
        label="Configurações"
        Icon={Cog}
        href="/settings"
        active={pathname === '/settings'}
        onClick={close}
      />
    </nav>
  )
}
