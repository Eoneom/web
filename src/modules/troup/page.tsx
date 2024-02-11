import React, { useEffect } from 'react'

import { LayoutPage } from '#ui/layout/page'
import { TroupList } from '#troup/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'
import { useBuilding } from '#building/hook'
import { useAppSelector } from '#store/type'
import { selectCityId } from '#city/slice'

export const TroupPage: React.FC = () => {
  const { list, selectedTroup } = useTroup()
  const { list: listBuildings } = useBuilding()
  const cityId = useAppSelector(selectCityId)

  useEffect(() => {
    if (!cityId) {
      return
    }

    list()
    listBuildings()
  }, [cityId])

  return <LayoutPage details={selectedTroup && <TroupDetails />}>
    <TroupList />
  </LayoutPage>
}
