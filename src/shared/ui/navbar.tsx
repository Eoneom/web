import { SyncDataResponse } from '@kroust/swarm-client'
import React from 'react'
import { transformDecimals } from '#helpers/transform'

interface Props {
  city: SyncDataResponse['cities'][number]
}

export const Navbar: React.FC<Props> = ({ city }) => {
  return <nav id='navbar'>
    <h4>Swarm</h4>
    <h1>{city.name}</h1>
    <ul>
      <li>Plastique: {transformDecimals(city.plastic)} (~{Math.round(city.earnings_per_second.plastic)}/s)</li>
      <li>Champignon: {transformDecimals(city.mushroom)} (~{Math.round(city.earnings_per_second.mushroom)}/s)</li>
    </ul>
  </nav>
}
