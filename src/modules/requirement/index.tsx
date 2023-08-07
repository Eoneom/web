import React from 'react'
import { RequirementBuilding } from './building'
import { RequirementTechnology } from './technology'
import { Requirement as RequirementValue } from '@kroust/swarm-client'

interface Props {
  cityId: string
  requirements: RequirementValue
}

export const Requirement: React.FC<Props> = ({ requirements, cityId }) => {
  const requirement_elements = [
    ...requirements.buildings.map(requirement => <RequirementBuilding
      key={requirement.code}
      cityId={cityId}
      requirement={requirement}
    />),
    ...requirements.technologies.map(requirement => <RequirementTechnology
      key={requirement.code}
      requirement={requirement}
    />)
  ]

  return (
    <aside>
      <h3>Pré-requis</h3>
      {Boolean(requirement_elements.length) &&
        <ul>
          {requirement_elements}
        </ul>
      }
    </aside>
  )
}
