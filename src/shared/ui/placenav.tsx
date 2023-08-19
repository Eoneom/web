import { useCity } from '#city/hook'
import React from 'react'

export const PlaceNav: React.FC = () => {
  const { selectedCity } = useCity()
  return <aside id="place-nav">
    { selectedCity && <ul>
      <li>{ selectedCity.name}</li>
    </ul>}
  </aside>
}
