import React, { useEffect } from 'react'

import { LayoutPage } from '#ui/layout/page'
import { TroupList } from '#troup/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'
import { useAppDispatch, useAppSelector } from '#store/type'
import { selectCityId } from '#city/slice'
import { listBuildings } from '#building/slice/thunk'

export const TroupPage: React.FC = () => {
  const { list, selectedTroup } = useTroup()
  const dispatch = useAppDispatch()
  const cityId = useAppSelector(selectCityId)

  useEffect(() => {
    if (!cityId) {
      return
    }

    list()
    dispatch(listBuildings())
  }, [cityId])

  return <LayoutPage details={selectedTroup && <TroupDetails />}>
    <TroupList />
  </LayoutPage>
}
