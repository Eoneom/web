import React, { useMemo, useState } from 'react'

import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { TroupDetailsRecruit } from '#troup/details/recruit'
import { Requirement } from '#requirement/index'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { Cost } from '#cost/index'
import { hasEnoughResources } from '#city/helper'
import { useCity } from '#city/hook'
import { useBuilding } from '#building/hook'
import { useTechnology } from '#technology/hook'
import { areRequirementsMet } from '#requirement/helper'

export const TroupDetails: React.FC = () => {
  const { selectedTroup, inProgress } = useTroup()
  const { buildings } = useBuilding()
  const { technologies } = useTechnology()
  const { city } = useCity()
  const [count, setCount] = useState(1)

  if (!selectedTroup) {
    return null
  }

  const { name } = TroupTranslations[selectedTroup.code]
  const numberCount = Number.isNaN(count) ? 1 : count
  const plasticCost = numberCount*selectedTroup.cost.plastic
  const mushroomCost = numberCount*selectedTroup.cost.mushroom

  const requirementsMet = useMemo(() => {
    return areRequirementsMet({
      requirement: selectedTroup.requirement,
      buildings,
      technologies
    })
  }, [selectedTroup.requirement, buildings, technologies])

  const canRecruit = !inProgress &&
    hasEnoughResources({
      city,
      cost: {
        plastic: plasticCost,
        mushroom: mushroomCost
      }
    }) &&
    requirementsMet

  return <>
    <LayoutDetailsContent>
      <h2>{name}</h2>
    </LayoutDetailsContent>
    <Requirement requirements={selectedTroup.requirement} />
    <Cost
      plastic={plasticCost}
      mushroom={mushroomCost}
      duration={numberCount*selectedTroup.cost.duration}
      action={
        <TroupDetailsRecruit
          canRecruit={canRecruit}
          count={count}
          onChange={value => setCount(value)}
        />
      }
    />
  </>
}
