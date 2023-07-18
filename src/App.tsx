import React, { useMemo, useState } from 'react'
import { useSync } from './hooks/sync'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { upgradeBuilding } from './api/building/upgrade'
import { transformDecimals } from './helpers/transform'
import { LoginForm } from './components/LoginForm'

const App: React.FC = () => {
  const [token, setToken] = useState('')
  const [city, setCity] = useState<SyncDataResponse['cities'][number] | null>(null)
  const [buildings, setBuildings] = useState<SyncDataResponse['cities'][number]['buildings']>([])
  const [technologies, setTechnologies] = useState<SyncDataResponse['technologies']>([])
  const is_building_in_progress = useMemo(() => {
    return buildings.some(building => building.upgrade_at)
  }, [buildings])

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

  useSync({ token, onChange: onSyncChange })

  const displayRemainingTime = (upgrade_at?: number) => {
    if (!upgrade_at) {
      return
    }

    return ` - construit dans ${Math.ceil((upgrade_at - new Date().getTime()) / 1000)}s`
  }

  return (
    <main>
      {!token && <LoginForm onLogin={({token}) => setToken(token)}/>}
      {
        Boolean(token) && Boolean(city) && <>
          <h1>{city?.name} ({city?.id})</h1>
          <h2>Ressources</h2>
          <ul>
            <li>Plastique: {transformDecimals(city?.plastic)}</li>
            <li>Champignon: {transformDecimals(city?.mushroom)}</li>
          </ul>
          <h2>Constructions</h2>
          <ul>
            {buildings.map(building => (
              <li key={building.code}>
                {building.code} {building.level} {displayRemainingTime(building.upgrade_at)} {
                  !is_building_in_progress && <button onClick={() => {
                    upgradeBuilding({ token, city_id: city?.id, building_code: building.code })
                  } }>
              Construire
                  </button>}
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
        </>
      }
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
    </main>
  )
}

export default App
