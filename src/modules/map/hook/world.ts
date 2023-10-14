import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { Sector } from '#types'
import { getSector } from '#map/api/sector'
import { useEffect, useState } from 'react'

export const useWorld = () => {
  const [sector, setSector] = useState<Sector | null>(null)
  const { token } = useAuth()
  const { city } = useCity()

  const fetch = async ({ token, sector }: { token: string, sector: number }) => {
    const fetched_sector = await getSector({ token, sector })

    if (!fetched_sector) {
      return
    }

    setSector({
      id: sector,
      cells: fetched_sector.cells
    })
  }

  useEffect(() => {
    if (!token || !city) {
      return
    }

    fetch({ token, sector: city.coordinates.sector })
  }, [token, city])

  return {
    sector,
    fetch
  }
}
