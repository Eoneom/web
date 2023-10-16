import React, { useState } from 'react'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { TroupDetailsRecruit } from '#troup/details/recruit'
import { Requirement } from '#requirement/index'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { Cost } from '#cost/index'

export const TroupDetails: React.FC = () => {
  const { selectedTroup } = useTroup()
  const [count, setCount] = useState(1)

  if (!selectedTroup) {
    return null
  }

  const { name } = TroupTranslations[selectedTroup.code]
  const numberCount = Number.isNaN(count) ? 1 : count
  return <>
    <LayoutDetailsContent>
      <h2>{name}</h2>
    </LayoutDetailsContent>
    <Requirement requirements={selectedTroup.requirement} />
    <Cost
      plastic={numberCount*selectedTroup.cost.plastic}
      mushroom={numberCount*selectedTroup.cost.mushroom}
      duration={numberCount*selectedTroup.cost.duration}
      action={
        <TroupDetailsRecruit count={count} onChange={value => setCount(value)} />
      }
    />
  </>
}
