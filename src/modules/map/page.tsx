import React, { useEffect, useMemo, useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { LayoutPage } from '#ui/layout/page'
import { MapDetails } from '#map/details'
import { useTroup } from '#troup/hook'
import { useAuth } from '#auth/hook'
import { useOutpost } from '#outpost/hook'
import { useWorld } from '#map/hook/world'
import { useAppSelector } from '#store/type'
import { selectCityCoordinates } from '#city/slice'

export const MapPage: React.FC = () => {
  const { list } = useTroup()
  const cityCoordinates = useAppSelector(selectCityCoordinates)
  const { outpost } = useOutpost()
  const { token } = useAuth()
  const { fetch, sector } = useWorld()
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number} | null>(null)

  useEffect(() => {
    const sectorId = cityCoordinates ? cityCoordinates.sector : outpost?.coordinates.sector
    if (!sectorId) {
      return
    }

    list()
    fetch({ sectorId })
  }, [token, cityCoordinates, outpost])

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
