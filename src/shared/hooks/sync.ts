import { useEffect } from 'react'

import { client } from '#shared/api'
import { isError } from '#helpers/assertion'
import { useAuth } from '#auth/hook'

interface UseSyncProps {
  onSync: () => void
  onError: (errorCode: string) => void
}

export const useSync = ({ onSync, onError }: UseSyncProps) => {
  const { token } = useAuth()
  const sync = async () => {
    const res = await client.player.sync(token)
    if (isError(res)) {
      onError(res.error_code)
      return
    }

    onSync()
  }

  useEffect(() => {
    if (!token) {
      return
    }

    const interval = setInterval (() => {
      sync()
    }, 5000)

    sync()

    return () => clearInterval(interval)
  }, [token])
}
