import React, { useMemo } from 'react'

import { useTroup } from '#troup/hook'
import { Button } from '#ui/button'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { MapDetailsActionBase } from '#map/details/action/base'
import { Sector } from '#types'
import { useOutpost } from '#outpost/hook'
import { useAppSelector } from '#store/type'
import { selectCity } from '#city/slice'

interface Props {
  coordinates: {
    x: number
    y: number
  }
  sector: Sector
}

export const MapDetails: React.FC<Props> = ({ coordinates, sector }) => {
  const city = useAppSelector(selectCity)
  const { outpost } = useOutpost()
  const { explore } = useTroup()

  const selectedCell = useMemo(() => {
    if (!coordinates) {
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

    const origin = city ? city.coordinates : outpost?.coordinates
    if (!origin) {
      return
    }

    explore({
      origin,
      destination: { sector: sector.id, x: coordinates.x, y: coordinates.y }
    })
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
    {
      selectedCell &&
      selectedCell.characteristic &&
      sector &&
      <MapDetailsActionBase coordinates={{sector: sector.id, x: coordinates.x, y: coordinates.y}}/>
    }
  </LayoutDetailsContent>
}
