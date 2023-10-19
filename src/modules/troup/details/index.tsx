import React, { useState } from 'react'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { TroupDetailsRecruit } from '#troup/details/recruit'
import { Requirement } from '#requirement/index'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { Cost } from '#cost/index'
import { hasEnoughResources } from '#helpers/validation'
import { useCity } from '#city/hook'

export const TroupDetails: React.FC = () => {
  const { selectedTroup, inProgress } = useTroup()
  const { city } = useCity()
  const [count, setCount] = useState(1)

  if (!selectedTroup) {
    return null
  }

  const { name } = TroupTranslations[selectedTroup.code]
  const numberCount = Number.isNaN(count) ? 1 : count
  const plasticCost = numberCount*selectedTroup.cost.plastic
  const mushroomCost = numberCount*selectedTroup.cost.mushroom

  const canRecruit = !inProgress && hasEnoughResources({
    city,
    cost: {
      plastic: plasticCost,
      mushroom: mushroomCost
    }
  })

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
