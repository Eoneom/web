import React from 'react'
import { LayoutPage } from '#ui/layout/page'
import { MovementList } from '#movement/list'

export const MovementPage: React.FC = () => {
  return <LayoutPage>
    <MovementList />
  </LayoutPage>
}
