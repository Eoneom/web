import React, { useEffect } from 'react'

import { LayoutPage } from '#ui/layout/page'
import { TroupList } from '#troup/list'
import { useTroup } from '#troup/hook'
import { TroupDetails } from '#troup/details'

export const TroupPage: React.FC = () => {
  const { list, selectedTroup } = useTroup()
  useEffect(() => {
    list()
  }, [])

  return <LayoutPage details={selectedTroup && <TroupDetails />}>
    <TroupList />
  </LayoutPage>
}
