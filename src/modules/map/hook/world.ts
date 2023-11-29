import { useAuth } from '#auth/hook'
import { Sector } from '#types'
import { getSector } from '#map/api/sector'
import { useState } from 'react'

export interface HookWorld {
  fetch: (params: FetchParams) => Promise<void>
}

interface FetchParams {
  sectorId: number
}

export const useWorld = () => {
  const [sector, setSector] = useState<Sector | null>(null)
  const { token } = useAuth()

  const fetch = async ({ sectorId }: FetchParams) => {
    const fetched_sector = await getSector({ token, sectorId })

    if (!fetched_sector) {
      return
    }

    setSector({
      id: sectorId,
      cells: fetched_sector.cells
    })
  }

  return {
    sector,
    fetch
  }
}
