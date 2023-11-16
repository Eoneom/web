import React, { useEffect, useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { LayoutPage } from '#ui/layout/page'
import { MapDetails } from '#map/details'
import { useTroup } from '#troup/hook'

export const MapPage: React.FC = () => {
  const {list} = useTroup()
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number} | null>(null)

  useEffect(() => {
    list()
  }, [])

  return <LayoutPage details={selectedCoordinates && <MapDetails coordinates={selectedCoordinates} />}>
    <MapCanvas onCellClicked={setSelectedCoordinates}/>
  </LayoutPage>
}
