import React, { useMemo } from 'react'
import { useTroup } from '#troup/hook'
import { TroupListItem } from '#troup/list/item'
import { TroupListInProgress } from '#troup/list/in-progress'
import { List } from '#ui/list'

export const TroupList: React.FC = () => {
  const { troups } = useTroup()
  const title = 'Troupes'
  const subtitle = <TroupListInProgress />
  const items = useMemo(() => {
    return troups.map(troup => <TroupListItem key={troup.id} troup={troup}/>)
  }, [troups])

  return <List
    title={title}
    subtitle={subtitle}
    items={items}
  />
}