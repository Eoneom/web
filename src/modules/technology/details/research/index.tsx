import React from 'react'

import { useCity } from '#city/hook'
import { hasEnoughResources } from '#city/helper'
import { useTechnology } from '#technology/hook'
import { Technology } from '#types'
import { Button } from '#ui/button'
import { useRequirement } from '#requirement/hook'

interface Props {
  technology: Technology
}

export const TechnologyDetailsResearch: React.FC<Props> = ({ technology }) => {
  const { inProgress, research } = useTechnology()
  const { city } = useCity()
  const { isRequirementMet } = useRequirement({ requirement: technology.requirement })

  const canResearch = !inProgress &&
    hasEnoughResources({ city, cost: technology.research_cost }) &&
    isRequirementMet

  return <Button disabled={!canResearch} onClick={() => research({ code: technology.code })}>
    Rechercher
  </Button>
}
