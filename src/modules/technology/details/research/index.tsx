import { useCity } from '#city/hook'
import { hasEnoughResources } from '#helpers/validation'
import { useTechnology } from '#technology/hook'
import { Technology } from '#types'
import { Button } from '#ui/button'
import React from 'react'

interface Props {
  technology: Technology
}

export const TechnologyDetailsResearch: React.FC<Props> = ({ technology }) => {
  const { inProgress, research } = useTechnology()
  const { city } = useCity()
  const canResearch = !inProgress &&
    hasEnoughResources({ city, cost: technology.research_cost })

  return <Button disabled={!canResearch} onClick={() => research({ code: technology.code })}>
    Rechercher
  </Button>
}
