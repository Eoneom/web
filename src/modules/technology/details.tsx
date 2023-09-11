import React from 'react'
import { Technology } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { useTechnology } from '#technology/hook'
import { LayoutDetails } from '#ui/layout/details'
import { Button } from '#ui/button'

interface Props {
  technology?: Technology
}

export const TechnologyDetails: React.FC<Props> = ({ technology }) => {
  const { research, inProgress } = useTechnology()
  if (!technology) {
    return null
  }

  const { name } = TechnologyTranslations[technology.code]
  const details = <>
    <h2>{name}</h2>
    {!inProgress && <Button onClick={() => research({ code: technology.code })}>Rechercher</Button>}
  </>

  return <LayoutDetails
    itemDetails={details}
    requirements={technology.requirement}
    cost={technology.research_cost}
  />
}
