import React from 'react'

import { hasEnoughResources } from '#city/helper'
import { useTechnology } from '#technology/hook'
import { Technology } from '#types'
import { Button } from '#ui/button'
import { useRequirement } from '#requirement/hook'
import { useAppSelector } from '#store/type'
import { selectCity } from '#city/slice'
import { selectTechnologyInProgress } from '#technology/slice'

interface Props {
  technology: Technology
}

export const TechnologyDetailsResearch: React.FC<Props> = ({ technology }) => {
  const { research } = useTechnology()
  const inProgress = useAppSelector(selectTechnologyInProgress)
  const city = useAppSelector(selectCity)
  const { isRequirementMet } = useRequirement({ requirement: technology.requirement })

  const canResearch = !inProgress &&
    hasEnoughResources({ city, cost: technology.research_cost }) &&
    isRequirementMet

  return <Button disabled={!canResearch} onClick={() => research({ code: technology.code })}>
    Rechercher
  </Button>
}
