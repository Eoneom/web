import { PageLayout } from '#shared/layout/page'
import React, { useMemo, useState } from 'react'
import { TroupContentList } from '#troup/content/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'

export const TroupPage: React.FC = () => {
  const [selectedTroupId, setSelectedTroupId] = useState('')
  const { troups } = useTroup()
  const selectedTroup = useMemo(() => {
    return troups.find(troup => troup.id === selectedTroupId)
  }, [ troups, selectedTroupId])

  return <PageLayout
    content={<TroupContentList onSelectTroup={({id}) => setSelectedTroupId(id)}/>}
    details={selectedTroup && <TroupDetails troup={selectedTroup}/>}
    displayDetails={Boolean(selectedTroup)}
  />
}
