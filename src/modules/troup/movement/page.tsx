import React from 'react'
import { PageLayout } from '#shared/layout/page'
import { MovementList } from '#troup/movement/list'

export const MovementPage: React.FC = () => {
  return <PageLayout
    content={<MovementList />}
    details={<></>}
    displayDetails={false}
  />
}
