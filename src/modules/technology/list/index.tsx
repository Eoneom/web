import React, { useMemo } from 'react'
import { TechnologyListItem } from '#technology/list/item'
import { useTechnology } from '#technology/hook'
import { Technology } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#ui/button'

interface Props {
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyList: React.FC<Props> = ({ onSelectTechnology }) => {
  const { technologies, cancel, inProgress } = useTechnology()

  const technology_items = useMemo(() => {
    return technologies.map(technology => <TechnologyListItem
      onSelectTechnology={onSelectTechnology}
      key={technology.id}
      technology={technology}
    />)
  }, [technologies])

  return <>
    <h2>Technologies</h2>
    {
      inProgress &&
      <>
        <p>En cours: {TechnologyTranslations[inProgress.code].name} {formatTime(inProgress.remainingTime)}</p>
        <Button onClick={() => cancel()}>Annuler</Button>
      </>
    }
    <div className='list'>
      {technology_items}
    </div>
  </>
}
