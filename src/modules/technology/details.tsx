import React from 'react'
import { Technology } from '#shared/types'
import { TechnologyTranslations } from '#technology/translations'
import { useTechnology } from '#technology/hook'
import { Details } from '#shared/ui/details'
import { Button } from '#shared/ui/button'

interface Props {
  technology: Technology
}

export const TechnologyDetails: React.FC<Props> = ({ technology }) => {
  const { name } = TechnologyTranslations[technology.code]
  const { research, inProgress } = useTechnology()
  const details = <>
    <h2>{name}</h2>
    {!inProgress && <Button onClick={() => research({ code: technology.code })}>Rechercher</Button>}
  </>

  return <Details
    itemDetails={details}
    requirements={technology.requirements}
    plasticCost={technology.research_cost.plastic}
    mushroomCost={technology.research_cost.mushroom}
    durationCost={technology.research_cost.duration}
  />
}
