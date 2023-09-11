import React from 'react'
import { LayoutDetails } from '#ui/layout/details'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { TroupDetailsRecruit } from '#troup/details/recruit'

export const TroupDetails: React.FC = () => {
  const { selectedTroup } = useTroup()
  if (!selectedTroup) {
    return null
  }

  const { name } = TroupTranslations[selectedTroup.code]
  const details = <>
    <h2>{name}</h2>
    <TroupDetailsRecruit />
  </>

  return <LayoutDetails
    itemDetails={details}
    requirements={selectedTroup.requirement}
    cost={selectedTroup.cost}
  />
}
