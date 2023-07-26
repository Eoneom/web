import { useEffect } from 'react'
import { client } from '../api'
import { isError } from '../utils'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { toast } from 'react-toastify'

interface UseSyncProps {
  token: string
  onSync: (payload: SyncDataResponse) => void
  onError: (errorCode: string) => void
}

export const useSync = ({ token, onSync, onError }: UseSyncProps) => {
  const refreshAndSync = async () => {
    const refresh_res = await client.player.refresh(token)
    if (isError(refresh_res)) {
      onError(refresh_res.error_code)
      return
    }
    const sync_res = await client.player.sync(token)
    if (isError(sync_res)) {
      onError(sync_res.error_code)
      return
    }

    if (!sync_res.data) {
      toast.warn('data not found')
      return
    }

    const { data } = sync_res
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
      refreshAndSync()
    }, 1000)

    refreshAndSync()

    return () => clearInterval(interval)
  }, [token])
}
