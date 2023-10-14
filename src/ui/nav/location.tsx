import { useCity } from '#city/hook'
import React from 'react'

export const NavLocation: React.FC = () => {
  const { cities } = useCity()
  return <aside id="nav-location">
    { cities.length && <ul>
      {cities.map(city => (<li key={city.id}>{ city.name}</li>))}
    </ul>
    }
  </aside>
}
