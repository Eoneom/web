import React, { useEffect, useMemo, useState } from 'react'
import { TechnologyList } from '#technology/list'
import { TechnologyDetails } from '#technology/details'
import { useTechnology } from '#technology/hook'
import { LayoutPage } from '#ui/layout/page'

export const TechnologyPage: React.FC = () => {
  const [selectedTechnologyId, setSelectedTechnologyId] = useState('')
  const { technologies, list } = useTechnology()
  const selectedTechnology = useMemo(() => {
    return technologies.find(technology => technology.id === selectedTechnologyId)
  }, [technologies, selectedTechnologyId])

  useEffect(() => {
    list()
  }, [])

  return <LayoutPage details={<TechnologyDetails technology={selectedTechnology}/>}>
    <TechnologyList onSelectTechnology={({id}) => setSelectedTechnologyId(id)}/>
  </LayoutPage>
}
