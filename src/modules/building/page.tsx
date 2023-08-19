import { BuildingContentList } from '#building/content/list'
import { BuildingDetails } from '#building/details'
import { Building } from '#shared/types'
import React, { useState } from 'react'

export const BuildingPage: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)

  return <>
    <section id="content" className={selectedBuilding ? 'details-enabled': ''}>
      <BuildingContentList
        onSelectBuilding={(building) => setSelectedBuilding(building)}
      />
    </section>
    {
      selectedBuilding && <section id="details">
        {
          <BuildingDetails building={selectedBuilding} />
        }
      </section>
    }
  </>
}
