import React from 'react'

import { CityItem } from '#types'
import { NavLocationItem } from '#ui/nav/location/item'

interface Props {
  cities: CityItem[]
}

export const NavLocationCities: React.FC<Props> = ({ cities }) => {
  return <ul>
    {
      cities.map(city =>
        <NavLocationItem
          key={city.id}
          to={`/city/${city.id}`}
          text={city.name}
        />
      )
    }
  </ul>
}
