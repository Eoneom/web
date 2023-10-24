import React, { useEffect } from 'react'

import { LayoutPage } from '#ui/layout/page'
import { TroupList } from '#troup/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'
import { useBuilding } from '#building/hook'

export const TroupPage: React.FC = () => {
  const { list, selectedTroup } = useTroup()
  const { list: listBuildings } = useBuilding()
  useEffect(() => {
    list()
    listBuildings()
  }, [])

  return <LayoutPage details={selectedTroup && <TroupDetails />}>
    <TroupList />
  </LayoutPage>
}
