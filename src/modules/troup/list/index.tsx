import React, { useMemo } from 'react'
import { useTroup } from '#troup/hook'
import { TroupListItem } from '#troup/list/item'
import { TroupListInProgress } from '#troup/list/in-progress'
import { List } from '#ui/list'

export const TroupList: React.FC = () => {
  const { selectedTroup, troups } = useTroup()
  const items = useMemo(() => {
    return troups.map(troup => <TroupListItem
      active={selectedTroup?.code === troup.code}
      key={troup.id} troup={troup}
    />)
  }, [selectedTroup?.code, troups])

  return <List
    inProgress={<TroupListInProgress />}
    items={items}
  />
}
