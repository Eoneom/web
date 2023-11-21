import React from 'react'

import { OutpostItem } from '#types'
import { NavLocationItem } from '#ui/nav/location/item'
import { formatCoordinates } from '#helpers/transform'

interface Props {
  outposts: OutpostItem[]
}

export const NavLocationOutposts: React.FC<Props> = ({ outposts }) => {
  return <ul>
    {
      outposts.map(outpost =>
        <NavLocationItem
          key={outpost.id}
          to={`/outpost/${outpost.id}`}
          text={formatCoordinates(outpost.coordinates)}
        />
      )
    }
  </ul>
}
