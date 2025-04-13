'use client'

import { HTMLAttributes, useState } from 'react'
import Image, { ImageProps } from 'next/image'

import { cn } from '@/utils/cn'

const Avatar = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('w-10 h-10 rounded-full relative overflow-hidden', className)}
    {...props}
  />
)

const AvatarFallback = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className="absolute z-1 inset-0 border border-gray-400 rounded-full flex items-center justify-center text-text text-xs "
    {...props}
  />
)

const AvatarImage = ({ className, ...props }: ImageProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
    props.src && (
      <Image
        className={cn(
          'aspect-square w-full h-full opacity-100 z-2 absolute inset-0',
          { 'opacity-0': !loaded },
          className
        )}
        {...props}
        width={40}
        height={40}
        draggable={false}
        onLoadingComplete={() => {
          setLoaded(true)
        }}
      />
    )
  )
}

export { Avatar, AvatarFallback, AvatarImage }
