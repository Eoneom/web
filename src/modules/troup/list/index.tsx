import React, { useMemo } from 'react'
import { Troup } from '#types'
import { formatTime } from '#helpers/transform'
import { useTroup } from '#troup/hook'
import { TroupListItem } from '#troup/list/item'
import { TroupTranslations } from '#troup/translations'
import { Button } from '#ui/button'

interface Props {
  onSelectTroup: (troup: Troup) => void
}

export const TroupList: React.FC<Props> = ({ onSelectTroup }) => {
  const {
    troups,
    inProgress,
    cancel
  } = useTroup()

  const troup_items = useMemo(() => {
    return troups.map(troup => <TroupListItem
      onSelectTroup={onSelectTroup}
      key={troup.id}
      troup={troup}
    />)
  }, [troups])

  return <>
    <h2>Troupes</h2>
    {
      inProgress &&
      <>
        <p>En cours: {TroupTranslations[inProgress.code].name} {formatTime(inProgress.remainingTime)}</p>
        <Button onClick={() => cancel()}>Annuler</Button>
      </>
    }
    <div className='list'>
      {troup_items}
    </div>
  </>
}
