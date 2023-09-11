import React, { useMemo } from 'react'

import { useCity } from '#city/hook'
import { useWorld } from '#map/hook/world'
import { useTroup } from '#troup/hook'
import { Button } from '#ui/button'
import { LayoutDetails } from '#ui/layout/details'

interface Props {
  coordinates: {
    x: number
    y: number
  } | null
}

export const MapDetails: React.FC<Props> = ({ coordinates }) => {
  const { selectedCity } = useCity()
  const { sector } = useWorld()
  const { explore } = useTroup()

  const selectedCell = useMemo(() => {
    if (!sector || !coordinates) {
      return null
    }
    return sector.cells.find(cell =>
      cell.coordinates.x === coordinates.x &&
      cell.coordinates.y === coordinates.y
    )
  }, [sector, coordinates])

  const handleExplore = () => {
    if (!sector || !coordinates) {
      return
    }

    explore({ coordinates: { sector: sector.id, x: coordinates.x, y: coordinates.y}})
  }

  if (!coordinates) {
    return null
  }

  const details = <>
    <h2>Cellule sélectionnée: ({coordinates.x};{coordinates.y})</h2>
    {
      selectedCity?.coordinates.x === coordinates.x &&
      coordinates.y === selectedCity?.coordinates.y &&
      <>{selectedCity.name}</>
    }
    {
      selectedCell && !selectedCell.characteristic && <Button onClick={handleExplore}>Explorer</Button>
    }
  </>

  return <LayoutDetails itemDetails={details} />
}
