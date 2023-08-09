import React from 'react'
import { Technology } from '#shared/types'
import { transformDecimals } from '#helpers/transform'
import { TechnologyTranslations } from '#technology/translations'
import { Requirement } from '#requirement/index'

interface Props {
  technology: Technology
}

export const TechnologyDetails: React.FC<Props> = ({ technology }) => {
  const { name } = TechnologyTranslations[technology.code]
  return <>
    <Requirement requirements={technology.requirements}/>
    <article><h2>{name}</h2></article>
    <aside>
      <h3>Coût</h3>
      <ul>
        <li>Plastique: {transformDecimals(technology.research_cost.plastic)}</li>
        <li>Champignon: {transformDecimals(technology.research_cost.mushroom)}</li>
        <li>Durée: {technology.research_cost.duration}</li>
      </ul>
    </aside>
  </>
}
