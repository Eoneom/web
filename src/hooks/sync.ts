import { useEffect } from 'react'
import { client } from '../api'
import { isError } from '../utils'
import { player_id } from '.'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'

interface UseSyncProps {
  onChange: (payload: SyncDataResponse) => void
}

export const useSync = ({ onChange }: UseSyncProps) => {
  const refreshAndSync = async () => {
    const refresh_res = await client.player.refresh({ player_id })
    if (isError(refresh_res)) {
      console.error(refresh_res.error_code)
      return
    }
    const sync_res = await client.player.sync({ player_id })
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
