import React, { useState } from 'react'
import { useSync } from './hooks/sync'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'


const App = () => {
  const [plastic, setPlastic] = useState(0)
  const [mushroom, setMushroom] = useState(0)
  const onSyncChange = (data: SyncDataResponse) => {
    if (!data.cities.length) {
      console.warn('there is no city here 😬')
      return
    }

    const first_city = data.cities[0]

    setPlastic(first_city.plastic)
    setMushroom(first_city.mushroom)
  }

  useSync({ onChange: onSyncChange})

  return (
    <main>
      <ul>
        <li>Plastique: {plastic}</li>
        <li>Champignon: {mushroom}</li>
      </ul>
    </main>
  )
}

export default App
