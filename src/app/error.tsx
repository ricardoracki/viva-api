'use client' // Error boundaries must be Client Components

import { RefreshCcw, ShieldAlert } from 'lucide-react'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Container center className="">
      <div>
        <ShieldAlert size={200} className={'text-text'} />
        <h1 className="text-xl font-bold text-text text-center">
          Ocorreu um erro
        </h1>
        <Button
          variant="primary"
          className="gap-2 mt-6 px-6"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          <RefreshCcw />
          Tentar novamente
        </Button>
      </div>
    </Container>
  )
}
