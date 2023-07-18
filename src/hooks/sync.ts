import { useEffect } from 'react'
import { client } from '../api'
import { isError } from '../utils'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'

interface UseSyncProps {
  token: string
  onChange: (payload: SyncDataResponse) => void
}

export const useSync = ({ token, onChange }: UseSyncProps) => {
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

    onChange(sync_res.data)
  }

  useEffect(() => {
    if (!token) {
      console.log('refresh but no token')
      return
    }

    const interval = setInterval (() => {

      refreshAndSync()
    }, 1000)

    return () => clearInterval(interval)
  }, [token])
}
