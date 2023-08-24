import React, { useMemo, useState } from 'react'
import { TechnologyContentList } from '#technology/content/list'
import { TechnologyDetails } from '#technology/details'
import { useTechnology } from '#technology/hook'
import { PageLayout } from '#shared/layout/page'

export const TechnologyPage: React.FC = () => {
  const [selectedTechnologyId, setSelectedTechnologyId] = useState('')
  const { technologies } = useTechnology()
  const selectedTechnology = useMemo(() => {
    return technologies.find(technology => technology.id === selectedTechnologyId)
  }, [technologies, selectedTechnologyId])

  return <PageLayout
    content={<TechnologyContentList onSelectTechnology={({id}) => setSelectedTechnologyId(id)}/>}
    details={selectedTechnology && <TechnologyDetails technology={selectedTechnology}/>}
    displayDetails={Boolean(selectedTechnology)}
  />
}
