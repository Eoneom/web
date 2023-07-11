import React, { useState } from 'react'
import { useSync } from './hooks/sync'
import { player_id } from './hooks'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { upgradeBuilding } from './api/building/upgrade'

const App: React.FC = () => {
  const [city, setCity] = useState<SyncDataResponse['cities'][number] | null>(null)
  const [buildings, setBuildings] = useState<SyncDataResponse['cities'][number]['buildings']>([])
  const [technologies, setTechnologies] = useState<SyncDataResponse['technologies']>([])
  const onSyncChange = (data: SyncDataResponse) => {
    if (!data.cities.length) {
      toast('there is no city here 😬')
      return
    }

    const first_city = data.cities[0]
    if (!first_city) {
      return
    }

    setCity(first_city)
    setBuildings(first_city.buildings)
    setTechnologies(data.technologies)
  }

  useSync({ onChange: onSyncChange })

  return (
    <main>
      <h1>{city?.name} ({city?.id})</h1>
      <h2>Resources</h2>
      <ul>
        <li>Plastique: {city?.plastic}</li>
        <li>Champignon: {city?.mushroom}</li>
      </ul>
      <h2>Constructions</h2>
      <ul>
        {buildings.map(building => (
          <li key={building.code}>
            {building.code} {building.level} <button onClick={() => {
              upgradeBuilding({ player_id, city_id: city?.id, building_code: building.code })
            } }>
              Construire
            </button>
          </li>
        ))}
      </ul>
      <h2>Technologies</h2>
      <ul>
        {technologies.map(technology => (
          <li key={technology.code}>
            {technology.code} {technology.level}
          </li>
        ))}
      </ul>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
    </main>
  )
}

export default App
