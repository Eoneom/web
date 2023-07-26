import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import React from 'react'
import { transformDecimals } from '../../helpers/transform'

interface Props {
  city: SyncDataResponse['cities'][number]
  onGoToBuildings: () => void
  onGoToTechnologies: () => void
}

export const CityNavbar: React.FC<Props> = ({ city, onGoToBuildings, onGoToTechnologies }) => {
  return <nav className='city-navbar'>
    <ul>
      <li><a href="#" onClick={() => onGoToBuildings()}>Construction</a></li>
      <li><a href="#" onClick={() => onGoToTechnologies()}>Recherche</a></li>
      <li><a href="#">Recrutement</a></li>
    </ul>
    <h1>{city.name}</h1>
    <ul>
      <li>Plastique: {transformDecimals(city.plastic)}</li>
      <li>Champignon: {transformDecimals(city.mushroom)}</li>
    </ul>
  </nav>
}
