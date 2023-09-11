import React from 'react'
import {  Troup } from '#types'
import { Item } from '#ui/item'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'

interface Props {
  troup: Troup
}

export const TroupListItem: React.FC<Props> = ({ troup }) => {
  const { selectTroup } = useTroup()

  return <Item
    name={TroupTranslations[troup.code].name}
    count={troup.count}
    onSelect={() => selectTroup(troup.id)}
  />
}
