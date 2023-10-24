import React from 'react'
import {  Troup } from '#types'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { ListItemCount } from '#ui/list/item/count'

interface Props {
  active: boolean
  troup: Troup
}

export const TroupListItem: React.FC<Props> = ({ active, troup }) => {
  const { selectTroup } = useTroup()

  return <ListItemCount
    active={active}
    name={TroupTranslations[troup.code].name}
    count={troup.count}
    onSelect={() => selectTroup(troup.id)}
  />
}
