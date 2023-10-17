import React from 'react'

import { isWarehouseBuilding } from '@kroust/swarm-client'
import { BuildingDetailsMetadataWarehouse } from '#building/details/metadata/warehouse'
import { Building } from '#types'

interface Props {
  building: Building
}

export const BuildingDetailsMetadata: React.FC<Props> = ({ building }) => {
  if (isWarehouseBuilding(building)) {
    return <BuildingDetailsMetadataWarehouse
      currentCapacity={building.metadata.current_capacity}
      nextCapacity={building.metadata.next_capacity}
    />
  }

  return null
}
