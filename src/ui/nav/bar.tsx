import React from 'react'
import { transformDecimals } from '#helpers/transform'
import { useCity } from '#city/hook'
import { Link } from 'react-router-dom'

export const NavBar: React.FC = () => {
  const { selectedCity } = useCity()
  if (!selectedCity) {
    return null
  }

  const plasticClassName = selectedCity.plastic === selectedCity.warehouses_capacity.plastic ? 'danger' : 'success'
  const mushroomClassName = selectedCity.mushroom === selectedCity.warehouses_capacity.mushroom ? 'danger' : 'success'

  return <nav id='nav-bar'>
    <h4>Swarm</h4>
    <h1><Link to={'/'}>{selectedCity.name}</Link></h1>
    <ul>
      <li className={plasticClassName}>Plastique: {transformDecimals(selectedCity.plastic)} (~{transformDecimals(Math.round(selectedCity.earnings_per_second.plastic*3600))}/h)</li>
      <li className={mushroomClassName}>Champignon: {transformDecimals(selectedCity.mushroom)} (~{transformDecimals(Math.round(selectedCity.earnings_per_second.mushroom*3600))}/h)</li>
    </ul>
  </nav>
}
