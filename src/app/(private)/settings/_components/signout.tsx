'use client'

import { Button } from '@/components/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const SignoutButton = () => {
  async function onClick() {
    await signOut({ redirect: true })
  }

  return (
    <Button size="icon" onClick={onClick}>
      <LogOut />
    </Button>
  )
}
