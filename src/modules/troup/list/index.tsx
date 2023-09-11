import React, { useMemo } from 'react'
import { useTroup } from '#troup/hook'
import { TroupListItem } from '#troup/list/item'
import { TroupListInProgress } from '#troup/list/in-progress'

export const TroupList: React.FC = () => {
  const { troups } = useTroup()

  const troup_items = useMemo(() => {
    return troups.map(troup => <TroupListItem key={troup.id} troup={troup}/>)
  }, [troups])

  return <>
    <h2>Troupes</h2>
    <TroupListInProgress />
    <div className='list'>
      {troup_items}
    </div>
  </>
}
