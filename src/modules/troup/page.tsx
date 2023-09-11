import { LayoutPage } from '#ui/layout/page'
import React, { useEffect } from 'react'
import { TroupList } from '#troup/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'

export const TroupPage: React.FC = () => {
  const { list } = useTroup()

  useEffect(() => {
    list()
  }, [])

  return <LayoutPage details={<TroupDetails/>}>
    <TroupList/>
  </LayoutPage>
}
