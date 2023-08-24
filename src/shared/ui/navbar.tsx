import React from 'react'
import { transformDecimals } from '#helpers/transform'
import { useCity } from '#city/hook'
import { Link } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const { selectedCity } = useCity()
  if (!selectedCity) {
    return null
  }

  return <nav id='navbar'>
    <h4>Swarm</h4>
    <h1><Link to={'/'}>{selectedCity.name}</Link></h1>
    <ul>
      <li>Plastique: {transformDecimals(selectedCity.plastic)} (~{Math.round(selectedCity.earnings_per_second.plastic)}/s)</li>
      <li>Champignon: {transformDecimals(selectedCity.mushroom)} (~{Math.round(selectedCity.earnings_per_second.mushroom)}/s)</li>
    </ul>
  </nav>
}
