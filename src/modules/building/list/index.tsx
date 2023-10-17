import React, { useMemo } from 'react'

import { BuildingListItem } from '#building/list/item'
import { useBuilding } from '#building/hook'
import { BuildingTranslations } from '#building/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#ui/button'
import { useCity } from '#city/hook'
import { List } from '#ui/list'
import { useTimer } from '#hook/timer'

export const BuildingList: React.FC = () => {
  const { city } = useCity()
  const { buildings, inProgress, levelsTotal, cancel, finishUpgrade } = useBuilding()
  const { remainingTime, reset } = useTimer({
    onDone: () => finishUpgrade(),
    doneAt: inProgress?.upgrade_at
  })

  const handleCancel = () => {
    cancel()
    reset()
  }

  const levelsClassName = levelsTotal< (city?.maximum_building_levels??0) ? 'success': 'danger'
  const levels = <span className={levelsClassName}>({levelsTotal}/{city?.maximum_building_levels ?? 0})</span>
  const title = <>Constructions {levels}</>
  const subtitle = inProgress && <>
    <p>En cours: {BuildingTranslations[inProgress.code].name} {formatTime(remainingTime)}</p>
    <Button onClick={handleCancel}>Annuler</Button>
  </>

  const items = useMemo(() => buildings.map(buildingItem =>
    <BuildingListItem
      key={buildingItem.id}
      buildingItem={buildingItem}
    />
  ), [buildings])

  return <List
    title={title}
    subtitle={subtitle}
    items={items}
  />
}
