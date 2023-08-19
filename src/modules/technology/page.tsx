import { Technology } from '#shared/types'
import { TechnologyContentList } from '#technology/content/list'
import { TechnologyDetails } from '#technology/details'
import React, { useState } from 'react'

export const TechnologyPage: React.FC = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null)

  return (<>
    <section id="content" className={selectedTechnology ? 'details-enabled': ''}>
      <TechnologyContentList
        onSelectTechnology={(technology) => setSelectedTechnology(technology)}
      />
    </section>
    {
      selectedTechnology &&
      <section id="details">
        {
          <TechnologyDetails technology={selectedTechnology}/>
        }
      </section>
    }
  </>)
}
