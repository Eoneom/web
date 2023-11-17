import React, { useEffect } from 'react'

import { LayoutPage } from '#ui/layout/page'
import { TroupList } from '#troup/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'
import { useBuilding } from '#building/hook'
import { useCity } from '#city/hook'

export const TroupPage: React.FC = () => {
  const { list, selectedTroup } = useTroup()
  const { list: listBuildings } = useBuilding()
  const { city } = useCity()

  useEffect(() => {
    if (!city) {
      return
    }

    list()
    listBuildings()
  }, [city?.id])

  return <LayoutPage details={selectedTroup && <TroupDetails />}>
    <TroupList />
  </LayoutPage>
}
