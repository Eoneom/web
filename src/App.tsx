import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useSync } from './hooks/sync'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { ToastContainer, toast } from 'react-toastify'
import { LoginForm } from './components/LoginForm'
import { CityNavbar } from './components/city/navbar'
import { ContentBuildings } from './components/content/buildings'

import './styles.css'
import { ContentTechnologies } from './components/content/technologies'
import { DetailsBuilding } from './components/details/building'
import { Building, Technology } from './types'

type SelectedItem = { type: 'building', data: Building } |
  { type: 'technology', data: Technology } |
  null

const App: React.FC = () => {
  const [token, setToken] = useState('')
  const [city, setCity] = useState<SyncDataResponse['cities'][number] | null>(null)
  const [technologies, setTechnologies] = useState<SyncDataResponse['technologies']>([])
  const [selectedPage, setSelectedPage] = useState('buildings')
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)

  useEffect(() => {
    const stored_token = window.localStorage.getItem('token')
    if (stored_token) {
      setToken(stored_token)
    }
  }, [])

  const onLogin = ({ token }: {token: string}) => {
    window.localStorage.setItem('token', token)
    setToken(token)
  }

  const onSync = (data: SyncDataResponse) => {
    const first_city = data.cities[0]
    if (!first_city) {
      return
    }

    setCity(first_city)
    setTechnologies(data.technologies)
  }

  const onSyncError = (errorCode: string) => {
    if (errorCode === 'auth:not-found') {
      window.localStorage.removeItem('token')
      setToken('')
    } else {
      toast.error(errorCode)
    }
  }

  const selectPage = (page: string) => {
    setSelectedItem(null)
    setSelectedPage(page)
  }

  useSync({ token, onSync, onError: onSyncError })

  return (
    <main>
      {
        !token && <LoginForm onLogin={onLogin} />
      }
      {
        city &&
        <CityNavbar
          city={city}
          onGoToTechnologies={() => selectPage('technologies')}
          onGoToBuildings={() => selectPage('buildings')}/>
      }
      {
        city &&
        selectedPage === 'buildings' &&
        <ContentBuildings token={token} city={city} onSelectBuilding={(building) => setSelectedItem({type: 'building', data: building })}/>
      }
      {
        city &&
        Boolean(technologies?.length) &&
        selectedPage === 'technologies' &&
        <ContentTechnologies token={token} technologies={technologies} cityId={city.id}/>
      }
      {
        selectedItem?.type === 'building' &&
        <DetailsBuilding building={selectedItem.data} cost={{plastic: 100, mushroom: 100 }}/>
      }
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
    </main>
  )
}

export default App
