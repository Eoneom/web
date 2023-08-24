import React, { useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { useCity } from '#city/hook'
import { PageLayout } from '#shared/layout/page'

export const MapPage: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ x: number, y: number} | null>(null)
  const {selectedCity } = useCity()

  const details = selectedCell && <article id="details-content">
    <h2>Cellule sélectionnée: ({selectedCell.x};{selectedCell.y})</h2>
    {
      selectedCity?.coordinates.x === selectedCell.x &&
      selectedCell.y === selectedCity?.coordinates.y &&
        <>{selectedCity.name}</>
    }
  </article>

  return <PageLayout
    content={<MapCanvas onCellSelected={setSelectedCell}/>}
    details={details}
    displayDetails={Boolean(selectedCell)}
  />
}
