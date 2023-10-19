import React, { useMemo } from 'react'

import { useCity } from '#city/hook'
import { hasEnoughResources } from '#city/helper'
import { useTechnology } from '#technology/hook'
import { Technology } from '#types'
import { Button } from '#ui/button'
import { useBuilding } from '#building/hook'
import { areRequirementsMet } from '#requirement/helper'

interface Props {
  technology: Technology
}

export const TechnologyDetailsResearch: React.FC<Props> = ({ technology }) => {
  const { inProgress, research, technologies } = useTechnology()
  const { buildings } = useBuilding()
  const { city } = useCity()
  const requirementsMet = useMemo(() => {
    return areRequirementsMet({
      requirement: technology.requirement,
      buildings,
      technologies
    })
  }, [technology.requirement, buildings, technologies])

  const canResearch = !inProgress &&
    hasEnoughResources({ city, cost: technology.research_cost }) &&
    requirementsMet

  return <Button disabled={!canResearch} onClick={() => research({ code: technology.code })}>
    Rechercher
  </Button>
}
