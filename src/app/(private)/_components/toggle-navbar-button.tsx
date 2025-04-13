'use client'

import { Button } from '@/components/button'
import { Menu } from 'lucide-react'
import { useNavbar } from '@/hooks/use-navbar'

export const ToggleNavbarButton = () => {
  const { toggle } = useNavbar()

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={toggle}
      className="lg:hidden"
    >
      <Menu />
    </Button>
  )
}
