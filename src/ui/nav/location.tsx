import { useCity } from '#city/hook'
import React from 'react'

export const NavLocation: React.FC = () => {
  const { selectedCity } = useCity()
  return <aside id="nav-location">
    { selectedCity && <ul>
      <li>{ selectedCity.name}</li>
    </ul>}
  </aside>
}
