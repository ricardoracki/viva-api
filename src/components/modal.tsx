'use client'

import { Button, ButtonProps } from './button'
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { Separator } from './separator'
import { X } from 'lucide-react'

type ModalContextProps = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type ModalBodyProps = {
  children: React.ReactNode
  title?: string
  hideCloseButton?: boolean
  className?: string
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)

type ModalProps = {
  children: React.ReactNode
  externalControl?: boolean
}

type ModalHandle = {
  open: () => void
  close: () => void
  toggle: () => void
}

const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ externalControl, ...props }: ModalProps, ref) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
      setShow(!!externalControl)
    }, [externalControl])

    useImperativeHandle(ref, () => ({
      open: () => setShow(true),
      close: () => setShow(false),
      toggle: () => setShow((s) => !s),
    }))

    return <ModalContext.Provider value={{ show, setShow }} {...props} />
  }
)

const ModalTrigger = ({ onClick, ...props }: ButtonProps) => {
  const { setShow } = useContext(ModalContext)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setShow((v) => !v)
    onClick?.(event)
  }

  return <Button {...props} onClick={handleClick} />
}

const ModalBody = ({
  children,
  title,
  hideCloseButton,
  className,
}: ModalBodyProps) => {
  const { show, setShow } = useContext(ModalContext)

  if (!show) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-10">
      <div className="rounded-md bg-zinc-800 p-6 transition-all min-w-[360px] max-w-[540px] overflow-auto [&::-webkit-scrollbar]:hidden max-h-[95%]">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg text-text">{title}</h1>
          {!hideCloseButton && (
            <Button size="icon" variant="danger" onClick={() => setShow(false)}>
              <X />
            </Button>
          )}
        </div>
        <Separator />
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}

export { Modal, ModalTrigger, ModalBody }
