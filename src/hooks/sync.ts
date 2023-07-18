import { useEffect } from 'react'
import { client } from '../api'
import { isError } from '../utils'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'

interface UseSyncProps {
  token: string
  onSync: (payload: SyncDataResponse) => void
}

export const useSync = ({ token, onSync }: UseSyncProps) => {
  const refreshAndSync = async () => {
    const refresh_res = await client.player.refresh(token)
    if (isError(refresh_res)) {
      console.error(refresh_res.error_code)
      return
    }
    const sync_res = await client.player.sync(token)
    if (isError(sync_res)) {
      console.error(sync_res.error_code)
      return
    }

    if (!sync_res.data) {
      console.warn('data not found')
      return
    }

    onSync(sync_res.data)
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
