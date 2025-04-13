'use client'

import { Button } from './button'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

const Toast = () => {
  const { hide, text, time = 3000, variant, visible } = useToast()

  useEffect(() => {
    if (visible) {
      setTimeout(hide, time)
    }
  }, [visible])

  return (
    <div
      className={cn(
        'fixed top-0 translate-y-[-100%] left-[50%]  translate-x-[-50%] backdrop-blur-sm min-w-xl p-4 rounded-lg flex items-center justify-center z-50 bg-linear-to-b transition-all ease-in-out duration-500',
        {
          'top-10 translate-y-0': visible,
          'from-transparent to-red-500/50': variant === 'error',
          'from-transparent to-amber-500/50': variant === 'warning',
          'from-transparent to-green-500/50': variant === 'success',
          'from-transparent to-zinc-500/50': variant === 'default',
        }
      )}
    >
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={hide}
        className="absolute top-2 right-2 z-10"
      >
        <X size={20} />
      </Button>
      <p className="text-text">{text}</p>
    </div>
  )
}

export { Toast }
