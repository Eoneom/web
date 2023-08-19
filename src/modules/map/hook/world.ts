import { getSector } from '../api/sector'
import { WorldGetSectorDataResponse } from '@kroust/swarm-client'
import { useState } from 'react'

export const useWorld = () => {
  const [sector, setSector] = useState<WorldGetSectorDataResponse | null>(null)

  const fetch = async ({ token, sector }: { token: string, sector: number }) => {
    const fetched_sector = await getSector({ token, sector })

    if (!fetched_sector) {
      return
    }

    setSector(fetched_sector)
  }

  return {
    sector,
    fetch
  }
}
