import React, { useMemo, useState } from 'react'
import { TechnologyContentList } from '#technology/content/list'
import { TechnologyDetails } from '#technology/details'
import { useTechnology } from '#technology/hook'

export const TechnologyPage: React.FC = () => {
  const [selectedTechnologyId, setSelectedTechnologyId] = useState('')
  const { technologies } = useTechnology()
  const selectedTechnology = useMemo(() => {
    return technologies.find(technology => technology.id === selectedTechnologyId)
  }, [technologies, selectedTechnologyId])

  return (<>
    <section id="content" className={selectedTechnologyId ? 'details-enabled': ''}>
      <TechnologyContentList onSelectTechnology={({id}) => setSelectedTechnologyId(id)}/>
    </section>
    {
      selectedTechnology && <section id="details">
        <TechnologyDetails technology={selectedTechnology}/>
      </section>
    }
  </>)
}
