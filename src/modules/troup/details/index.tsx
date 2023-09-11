import React from 'react'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { TroupDetailsRecruit } from '#troup/details/recruit'
import { Requirement } from '#requirement/index'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { Cost } from '#cost/index'

export const TroupDetails: React.FC = () => {
  const { selectedTroup } = useTroup()
  if (!selectedTroup) {
    return null
  }

  const { name } = TroupTranslations[selectedTroup.code]
  return <>
    <LayoutDetailsContent>
      <h2>{name}</h2>
      <TroupDetailsRecruit />
    </LayoutDetailsContent>
    <Requirement requirements={selectedTroup.requirement} />
    <Cost {...selectedTroup.cost} />
  </>
}
