import React, { useEffect, useMemo, useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { LayoutPage } from '#ui/layout/page'
import { MapDetails } from '#map/details'
import { useTroup } from '#troup/hook'
import { useWorld } from '#map/hook/world'
import { useAppSelector } from '#store/type'
import { selectCityCoordinates } from '#city/slice'
import { selectOutpostCoordinates } from '#outpost/slice'

export const MapPage: React.FC = () => {
  const { list } = useTroup()
  const cityCoordinates = useAppSelector(selectCityCoordinates)
  const outpostCoordinates = useAppSelector(selectOutpostCoordinates)
  const { fetch, sector } = useWorld()
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number} | null>(null)

  useEffect(() => {
    const sectorId = cityCoordinates ? cityCoordinates.sector : outpostCoordinates?.sector
    if (!sectorId) {
      return
    }

    list()
    fetch({ sectorId })
  }, [cityCoordinates, outpostCoordinates])

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
