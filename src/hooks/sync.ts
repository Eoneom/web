import { useEffect } from 'react'
import { client } from '../http/api'
import { isError } from '../utils'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'

interface UseSyncProps {
  onChange: (payload: SyncDataResponse) => void
}

export const useSync = ({ onChange }: UseSyncProps) => {
  const refreshAndSync = async () => {
    const refresh_res = await client.player.refresh({ player_id: '64abcd82967f262b52301840' })
    if (isError(refresh_res)) {
      console.error(refresh_res.error_code)
      return
    }
    const sync_res = await client.player.sync({ player_id: '64abcd82967f262b52301840' })
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
    const interval = setInterval (() => {
      refreshAndSync()
    }, 3000)

    refreshAndSync()

    return () => clearInterval(interval)
  }, [])
}
