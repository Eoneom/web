import { useEffect } from 'react'
import { client } from '../api'
import { isError } from '../../helpers/assertion'
import { SyncDataResponse } from '@kroust/swarm-client'
import { toast } from 'react-toastify'
import { useAuth } from '../../modules/auth/hook'

interface UseSyncProps {
  onSync: (payload: SyncDataResponse) => void
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

    if (!res.data) {
      toast.warn('data not found')
      return
    }

    const { data } = res
    if (!data.cities.length) {
      toast.error('there is no city here 😬')
      return
    }

    onSync(data)
  }

  useEffect(() => {
    if (!token) {
      return
    }

    const interval = setInterval (() => {
      sync()
    }, 1000)

    sync()

    return () => clearInterval(interval)
  }, [token])
}