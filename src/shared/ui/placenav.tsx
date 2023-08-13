import { City } from '#shared/types'
import React from 'react'

interface Props {
  city: City
}

export const PlaceNav: React.FC<Props> = ({ city }) => {
  return <aside id="place-nav">
    <ul>
      <li>{city.name}</li>
    </ul>
  </aside>
}
