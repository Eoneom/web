import React from 'react'
import {  Troup } from '#types'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { ListItemCount } from '#ui/list/item/count'

interface Props {
  troup: Troup
}

export const TroupListItem: React.FC<Props> = ({ troup }) => {
  const { selectTroup } = useTroup()

  return <ListItemCount
    name={TroupTranslations[troup.code].name}
    count={troup.count}
    onSelect={() => selectTroup(troup.id)}
  />
}
