import React from 'react'
import {  Troup } from '#types'
import { Item } from '#ui/item'
import { TroupTranslations } from '#troup/translations'

interface Props {
  troup: Troup
  onSelectTroup: (troup: Troup) => void
}

export const TroupListItem: React.FC<Props> = ({ troup, onSelectTroup }) => {
  return <Item
    name={TroupTranslations[troup.code].name}
    count={troup.count}
    onSelect={() => onSelectTroup(troup)}
  />
}
