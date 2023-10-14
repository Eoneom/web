import React, { useMemo } from 'react'

import { BuildingListItem } from '#building/list/item'
import { Building } from '#types'
import { useBuilding } from '#building/hook'
import { BuildingTranslations } from '#building/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#ui/button'
import { useCity } from '#city/hook'
import { List } from '#ui/list'

interface Props {
  onSelectBuilding: (building: Building) => void
}

export const BuildingList: React.FC<Props> = ({ onSelectBuilding }) => {
  const { city } = useCity()
  const { buildings, inProgress, levelsTotal, cancel } = useBuilding()

  const title = `Constructions (${levelsTotal}/${city?.maximum_building_levels ?? 0})`
  const subtitle = inProgress && <>
    <p>En cours: {BuildingTranslations[inProgress.code].name} {formatTime(inProgress.remainingTime)}</p>
    <Button onClick={() => cancel()}>Annuler</Button>
  </>
  const items = useMemo(() => buildings.map(building =>
    <BuildingListItem
      onSelectBuilding={onSelectBuilding}
      key={building.id}
      building={building}
    />
  ), [buildings])

  return <List title={title} subtitle={subtitle} items={items}/>
}
