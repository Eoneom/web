import { City } from '#shared/types'
import { CellType } from '@kroust/swarm-client'

export const getCellFillStyle = ({ type, city, x, y }: { type?: CellType, city: City, x: number, y: number }): string => {
  if (city.coordinates.x === x && city.coordinates.y === y) {
    return '#FFF'
  }

  switch(type) {
  case CellType.FOREST:
    return '#0F0'
  case CellType.RUINS:
    return '#F00'
  case CellType.LAKE:
    return '#00F'
  }

  return '#000'
}
