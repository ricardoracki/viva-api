'use client'

import { Eye, EyeOff } from 'lucide-react'
import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  useState,
} from 'react'

import { Button } from './button'
import { cn } from '@/utils/cn'

const InputBlock = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'relative flex flex-col gap-2 [&>label]:text-sm [&>label]:text-gray-200 mb-6',
      className
    )}
    {...props}
  />
)
const Label = ({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn('text-zinc-100', className)} {...props} />
)

const FieldRoot = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'group flex w-full h-12 px-4 py-3 justify-center items-center gap-2 rounded-sm border border-solid border-zinc-700 bg-zinc-900 box-border transition-opacity focus-within:border-purple-500',
      className
    )}
    {...props}
  />
)

const Field = ({
  className,
  showRevalPassword = true,
  type = 'text',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { showRevalPassword?: boolean }) => {
  const [inputType, setInputType] = useState(type)

  return (
    <>
      <input
        type={inputType}
        className={cn(
          'outline-none border-none w-full h-full text-gray-100 text-md font-normal bg-transparent placeholder:text-gray-400 transition-colors ',
          className
        )}
        {...props}
      />
      {type === 'password' && showRevalPassword && (
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() =>
            setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
          }
        >
          {inputType === 'password' ? (
            <Eye className="text-gray-400" />
          ) : (
            <EyeOff className="text-gray-400" />
          )}
        </Button>
      )}
    </>
  )
}

const ErrorMessage = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('text-red-500 absolute -bottom-4 left-1 text-xs', className)}
    {...props}
  />
)

InputBlock.Label = Label
InputBlock.FieldRoot = FieldRoot
InputBlock.Field = Field
InputBlock.ErrorMessage = ErrorMessage

export { InputBlock }
