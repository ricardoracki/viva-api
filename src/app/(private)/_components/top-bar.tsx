import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar'

import { ToggleNavbarButton } from './toggle-navbar-button'
import { getServerAuthSession } from '@/backend/auth'
import { getUserInitials } from '@/utils/get-user-initials'

export const TopBar = async () => {
  const session = await getServerAuthSession()

  return (
    <div className="flex h-20 border border-transparent border-b-gray-700 items-center px-6 justify-between">
      <div className="flex items-center gap-2">
        <ToggleNavbarButton />
        <span className="text-lg font-bold text-text">{'<Logo>'}</span>
      </div>
      <Avatar>
        <AvatarFallback>
          {getUserInitials(session?.user?.name || '')}
        </AvatarFallback>
        <AvatarImage alt="Avatar" src={session?.user?.image || ''} />
      </Avatar>
    </div>
  )
}
