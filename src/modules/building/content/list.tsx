import React, { useMemo } from 'react'
import { BuildingContentItem } from '#building/content/item'
import { Building } from '#shared/types'
import { useBuilding } from '#building/hook'
import { BuildingTranslations } from '#building/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#shared/ui/button'
import { useCity } from '#city/hook'

interface Props {
  onSelectBuilding: (building: Building) => void
}

export const BuildingContentList: React.FC<Props> = ({ onSelectBuilding }) => {
  const { buildings, inProgress, levelsTotal, cancel } = useBuilding()
  const { selectedCity } = useCity()

  const building_items = useMemo(() => {
    return buildings.map(building => <BuildingContentItem
      onSelectBuilding={onSelectBuilding}
      key={building.id}
      building={building}/>)
  }, [buildings])

  return <>
    <h2>Constructions ({levelsTotal}/{selectedCity?.maximum_building_levels ?? 0})</h2>
    {
      inProgress &&
      <>
        <p>En cours: {BuildingTranslations[inProgress.code].name} {formatTime(inProgress.remainingTime)}</p>
        <Button onClick={() => cancel()}>Annuler</Button>
      </>
    }
    <div className='list'>
      {building_items}
    </div>
  </>
}
