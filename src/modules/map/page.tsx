import React, { useEffect, useMemo, useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { LayoutPage } from '#ui/layout/page'
import { MapDetails } from '#map/details'
import { useTroup } from '#troup/hook'
import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { useOutpost } from '#outpost/hook'
import { useWorld } from '#map/hook/world'

export const MapPage: React.FC = () => {
  const { list } = useTroup()
  const { city } = useCity()
  const { outpost } = useOutpost()
  const { token } = useAuth()
  const { fetch, sector } = useWorld()
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number} | null>(null)

  useEffect(() => {
    const sectorId = city ? city.coordinates.sector : outpost?.coordinates.sector
    if (!sectorId) {
      return
    }

    list()
    fetch({ sectorId })
  }, [token, city, outpost])

  const details = useMemo(() => {
    if (!selectedCoordinates || !sector) {
      return null
    }

    return <MapDetails coordinates={selectedCoordinates} sector={sector}/>
  }, [ selectedCoordinates, sector])

  return <LayoutPage details={details}>
    { sector && <MapCanvas onCellClicked={setSelectedCoordinates} sector={sector}/>}
  </LayoutPage>
}
