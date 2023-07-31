import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useSync } from './hooks/sync'
import { SyncDataResponse } from '@kroust/swarm-client/dist/endpoints/player/sync'
import { ToastContainer, toast } from 'react-toastify'
import { AuthLoginForm } from './modules/auth/login-form'
import { CityNavbar } from './modules/city/navbar'
import { BuildingContentList } from './modules/building/content/list'
import { TechnologyContentList } from './modules/technology/content/list'
import { BuildingDetails } from './modules/building/details'
import { Building, Technology } from './types'
import { BuildingContextProvider } from './modules/building/hook/context'
import { useAuth } from './modules/auth/hook'

import './styles.css'

type SelectedItem = { type: 'building', data: Building } |
  { type: 'technology', data: Technology } |
  null

const App: React.FC = () => {
  const { logout } = useAuth()
  const [city, setCity] = useState<SyncDataResponse['cities'][number] | null>(null)
  const [technologies, setTechnologies] = useState<SyncDataResponse['technologies']>([])
  const [selectedPage, setSelectedPage] = useState('buildings')
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)

  const onSync = (data: SyncDataResponse) => {
    const first_city = data.cities[0]
    if (!first_city) {
      return
    }

    setCity(first_city)
    setTechnologies(data.technologies)
  }

  const onSyncError = async (errorCode: string) => {
    if (errorCode === 'auth:not-found') {
      await logout()
    } else {
      toast.error(errorCode)
    }
  }

  const selectPage = (page: string) => {
    setSelectedItem(null)
    setSelectedPage(page)
  }

  useSync({ onSync, onError: onSyncError })

  return (
    <main>
      <BuildingContextProvider>
        <AuthLoginForm />
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
          <BuildingContentList
            cityId={city.id}
            onSelectBuilding={(building) => setSelectedItem({ type: 'building', data: building })}
          />
        }
        {
          city &&
            Boolean(technologies?.length) &&
            selectedPage === 'technologies' &&
            <TechnologyContentList technologies={technologies} cityId={city.id}/>
        }
        {
          selectedItem?.type === 'building' &&
            <BuildingDetails building={selectedItem.data} />
        }
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
        />
      </BuildingContextProvider>
    </main>
  )
}

export default App
