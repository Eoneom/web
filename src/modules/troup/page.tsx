import { LayoutPage } from '#ui/layout/page'
import React, { useEffect, useMemo, useState } from 'react'
import { TroupList } from '#troup/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'

export const TroupPage: React.FC = () => {
  const [selectedTroupId, setSelectedTroupId] = useState('')
  const { troups, list } = useTroup()

  useEffect(() => {
    list()
  }, [])

  const selectedTroup = useMemo(() => {
    return troups.find(troup => troup.id === selectedTroupId)
  }, [ troups, selectedTroupId])

  return <LayoutPage
    content={<TroupList onSelectTroup={({id}) => setSelectedTroupId(id)}/>}
    details={selectedTroup && <TroupDetails troup={selectedTroup}/>}
    displayDetails={Boolean(selectedTroup)}
  />
}
