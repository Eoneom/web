import React from 'react'

import { OutpostItem } from '#types'
import { NavLocationItem } from '#ui/nav/location/item'

interface Props {
  outposts: OutpostItem[]
}

export const NavLocationOutposts: React.FC<Props> = ({ outposts }) => {
  return <ul>
    {
      outposts.map(outpost =>
        <NavLocationItem
          key={outpost.cell_id}
          to={`/outpost/${outpost.id}`}
          text={`${outpost.coordinates.sector};${outpost.coordinates.x};${outpost.coordinates.y}`}
        />
      )
    }
  </ul>
}
