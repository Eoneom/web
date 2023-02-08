import React, { useEffect, useState } from 'react'

interface SyncResponse {
  city: {
    plastic: number
    mushroom: number
  }
}

const sync = async (token: string) : Promise<SyncResponse> => {
  const res = await fetch('http://localhost:3000/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  })

  const data = await res.json()
  return data
}

const App = () => {
  const token = 'Kroustille'
  const [mushroom, setMushroom] = useState(0)
  const [plastic, setPlastic] = useState(0)

  useEffect(() => { sync(token).then(data => {
    console.log(data)
    setMushroom(data.city.mushroom)
    setPlastic(data.city.plastic)
  }) }, [])

  return (
    <main>
      <header>
        <p>
          Plastique: {plastic}
        </p>
        <p>
          Champignon: {mushroom}
        </p>
      </header>
    </main>
  )
}

export default App
