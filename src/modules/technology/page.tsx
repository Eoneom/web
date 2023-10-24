import React, { useEffect, useMemo, useState } from 'react'
import { TechnologyList } from '#technology/list'
import { TechnologyDetails } from '#technology/details/index'
import { useTechnology } from '#technology/hook'
import { LayoutPage } from '#ui/layout/page'
import { useBuilding } from '#building/hook'

export const TechnologyPage: React.FC = () => {
  const [selectedTechnologyId, setSelectedTechnologyId] = useState('')
  const { technologies, list } = useTechnology()
  const { list: listBuildings } = useBuilding()
  const selectedTechnology = useMemo(() => {
    return technologies.find(technology => technology.id === selectedTechnologyId)
  }, [technologies, selectedTechnologyId])

  useEffect(() => {
    list()
    listBuildings()
  }, [])

  return <LayoutPage details={selectedTechnology && <TechnologyDetails technology={selectedTechnology}/>}>
    <TechnologyList onSelectTechnology={({id}) => setSelectedTechnologyId(id)} selectedTechnologyCode={selectedTechnology?.code}/>
  </LayoutPage>
}
