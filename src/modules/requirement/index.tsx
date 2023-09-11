import React from 'react'
import { RequirementBuilding } from '#requirement/building'
import { RequirementTechnology } from '#requirement/technology'
import { Requirement as RequirementValue } from '@kroust/swarm-client'

interface Props {
  requirements?: RequirementValue
}

export const Requirement: React.FC<Props> = ({ requirements }) => {
  const requirement_elements = requirements ? [
    ...requirements.buildings.map(requirement => <RequirementBuilding
      key={requirement.code}
      requirement={requirement}
    />),
    ...requirements.technologies.map(requirement => <RequirementTechnology
      key={requirement.code}
      requirement={requirement}
    />)
  ]: []

  const requirement_display = requirement_elements.length ? <ul>
    {requirement_elements}
  </ul> : 'Aucun'

  return (
    <aside id='requirement'>
      <h3>Pré-requis</h3>
      {requirement_display}
    </aside>
  )
}
