import React, { useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { LayoutPage } from '#ui/layout/page'
import { MapDetails } from '#map/details'

export const MapPage: React.FC = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number} | null>(null)

  return <LayoutPage details={selectedCoordinates && <MapDetails coordinates={selectedCoordinates} />}>
    <MapCanvas onCellClicked={setSelectedCoordinates}/>
  </LayoutPage>
}
