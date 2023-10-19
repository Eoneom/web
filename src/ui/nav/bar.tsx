import React from 'react'
import { transformDecimals, transformEarnings } from '#helpers/transform'
import { useCity } from '#city/hook'
import { Link } from 'react-router-dom'

export const NavBar: React.FC = () => {
  const { city } = useCity()
  if (!city) {
    return null
  }

  const plasticClassName = city.plastic >= city.warehouses_capacity.plastic ? 'danger' : 'success'
  const mushroomClassName = city.mushroom >= city.warehouses_capacity.mushroom ? 'danger' : 'success'

  return <nav id='nav-bar'>
    <h4>Swarm</h4>
    <h1><Link to={'/'}>{city.name}</Link></h1>
    <ul>
      <li className={plasticClassName}>
        Plastique: {transformDecimals(city.plastic)} ({transformEarnings(city.earnings_per_second.plastic)})
      </li>
      <li className={mushroomClassName}>
        Champignon: {transformDecimals(city.mushroom)} ({transformEarnings(city.earnings_per_second.mushroom)})
      </li>
    </ul>
  </nav>
}
