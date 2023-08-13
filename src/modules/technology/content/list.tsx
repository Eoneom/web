import React, { useEffect, useMemo } from 'react'
import { TechnologyContentItem } from '#technology/content/item'
import { useTechnology } from '#technology/hook'
import { Technology } from '#shared/types'
import { TechnologyTranslations } from '#technology/translations'
import { formatTime } from '#helpers/transform'
import { Button } from '#shared/ui/button'

interface Props {
  onSelectTechnology: (technology: Technology) => void
}

export const TechnologyContentList: React.FC<Props> = ({ onSelectTechnology }) => {
  const { technologies, cancel, list, inProgress } = useTechnology()

  useEffect(() => {
    list()
  }, [])

  const technology_items = useMemo(() => {
    return technologies.map(technology => <TechnologyContentItem
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
