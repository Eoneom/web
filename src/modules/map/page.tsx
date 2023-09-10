import React, { useMemo, useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { useCity } from '#city/hook'
import { PageLayout } from '#shared/layout/page'
import { useWorld } from '#map/hook/world'
import { Button } from '#shared/ui/button'
import { useTroup } from '#troup/hook'

export const MapPage: React.FC = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number} | null>(null)
  const { selectedCity } = useCity()
  const { sector } = useWorld()
  const { explore } = useTroup()

  const selectedCell = useMemo(() => {
    if (!sector || !selectedCoordinates) {
      return null
    }
    return sector.cells.find(cell =>
      cell.coordinates.x === selectedCoordinates.x &&
      cell.coordinates.y === selectedCoordinates.y
    )
  }, [sector, selectedCoordinates])

  const handleExplore = () => {
    if (!sector || !selectedCoordinates) {
      return
    }

    explore({ coordinates: { sector: sector.id, x: selectedCoordinates.x, y: selectedCoordinates.y}})
  }

  const details = selectedCoordinates && <article id="details-content">
    <h2>Cellule sélectionnée: ({selectedCoordinates.x};{selectedCoordinates.y})</h2>
    {
      selectedCity?.coordinates.x === selectedCoordinates.x &&
      selectedCoordinates.y === selectedCity?.coordinates.y &&
        <>{selectedCity.name}</>
    }
    {
      selectedCell && !selectedCell.characteristic && <Button onClick={handleExplore}>Explorer</Button>
    }
  </article>

  return <PageLayout
    content={<MapCanvas onCellClicked={setSelectedCoordinates}/>}
    details={details}
    displayDetails={Boolean(selectedCoordinates)}
  />
}
