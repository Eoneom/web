import React from 'react'
import {  Troup } from '#shared/types'
import { UIItem } from '#shared/ui/item'
import { TroupTranslations } from '#troup/translations'

interface Props {
  troup: Troup
  onSelectTroup: (troup: Troup) => void
}

export const TroupContentItem: React.FC<Props> = ({ troup, onSelectTroup }) => {
  return <UIItem
    name={TroupTranslations[troup.code].name}
    count={troup.count}
    onSelect={() => onSelectTroup(troup)}
  />
}
