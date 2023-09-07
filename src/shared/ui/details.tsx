import { formatTime, transformDecimals } from '#helpers/transform'
import { Requirement } from '#requirement/index'
import { Requirement as RequirementType } from '@kroust/swarm-client'
import React from 'react'

interface Props {
  itemDetails: React.ReactNode
  requirements?: RequirementType
  cost: {
    plastic: number
    mushroom: number
    duration: number
  }
}

export const Details: React.FC<Props> = ({itemDetails, requirements, cost }) => {
  return (
    <>
      <article id='details-content'>
        {itemDetails}
      </article>
      <Requirement requirements={requirements}/>
      <aside id='details-cost'>
        <h3>Coût</h3>
        <ul>
          <li>Plastique: {transformDecimals(cost.plastic)}</li>
          <li>Champignon: {transformDecimals(cost.mushroom)}</li>
          <li>Durée: {formatTime(cost.duration)}</li>
        </ul>
      </aside>
    </>
  )
}
