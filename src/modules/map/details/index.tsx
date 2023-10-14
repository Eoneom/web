import React, { useMemo } from 'react'

import { useCity } from '#city/hook'
import { useWorld } from '#map/hook/world'
import { useTroup } from '#troup/hook'
import { Button } from '#ui/button'
import { LayoutDetailsContent } from '#ui/layout/details/content'

interface Props {
  coordinates: {
    x: number
    y: number
  }
}

export const MapDetails: React.FC<Props> = ({ coordinates }) => {
  const { city } = useCity()
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


  return <LayoutDetailsContent>
    <h2>Cellule sélectionnée: ({coordinates.x};{coordinates.y})</h2>
    {
      city?.coordinates.x === coordinates.x &&
      city?.coordinates.y === coordinates.y &&
    <>{city.name}</>
    }
    {
      selectedCell && !selectedCell.characteristic && <Button onClick={handleExplore}>Explorer</Button>
    }
  </LayoutDetailsContent>
}
