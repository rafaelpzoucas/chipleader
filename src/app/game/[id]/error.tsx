'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
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
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h2 className="text-2xl">Ocorreu um erro!</h2>
      <Button
        className="mt-8"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Tentar novamente
      </Button>
    </div>
  )
}
