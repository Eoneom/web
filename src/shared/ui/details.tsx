import { formatTime, transformDecimals } from '#helpers/transform'
import { Requirement } from '#requirement/index'
import { Requirement as RequirementType } from '@kroust/swarm-client'
import React from 'react'

interface Props {
  itemDetails: React.ReactNode
  requirements?: RequirementType
  plasticCost: number
  mushroomCost: number
  durationCost: number
}

export const Details: React.FC<Props> = ({itemDetails, requirements, plasticCost, mushroomCost, durationCost}) => {
  return (
    <>
      <article id='details-content'>
        {itemDetails}
      </article>
      <Requirement requirements={requirements}/>
      <aside id='details-cost'>
        <h3>Coût</h3>
        <ul>
          <li>Plastique: {transformDecimals(plasticCost)}</li>
          <li>Champignon: {transformDecimals(mushroomCost)}</li>
          <li>Durée: {formatTime(durationCost)}</li>
        </ul>
      </aside>
    </>
  )
}
