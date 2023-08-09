import React, { useState } from 'react'

import { useSync } from '#shared/hooks/sync'
import { SyncDataResponse } from '@kroust/swarm-client'
import { ToastContainer, toast } from 'react-toastify'
import { AuthLoginForm } from '#auth/login-form'
import { CityNavbar } from '#city/navbar'
import { BuildingContentList } from '#building/content/list'
import { TechnologyContentList } from '#technology/content/list'
import { BuildingDetails } from '#building/details'
import { Building, Technology } from '#shared/types'
import { BuildingContextProvider } from '#building/hook/context'
import { useAuth } from '#auth/hook'
import { TechnologyContextProvider } from '#technology/hook/context'
import { TechnologyDetails } from '#technology/details'
import { useCity } from '#city/hook'


type SelectedItem = { type: 'building', data: Building } |
  { type: 'technology', data: Technology } |
  null

const App: React.FC = () => {
  const { logout } = useAuth()
  const [city, setCity] = useState<SyncDataResponse['cities'][number] | null>(null)
  const [selectedPage, setSelectedPage] = useState('buildings')
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const { selectCity } = useCity()

  const onSync = (data: SyncDataResponse) => {
    const first_city = data.cities[0]
    if (!first_city) {
      return
    }

    setCity(first_city)
    selectCity(first_city.id)
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
        <TechnologyContextProvider>
          <AuthLoginForm />
          {
            city &&
            <CityNavbar
              city={city}
              onGoToTechnologies={() => selectPage('technologies')}
              onGoToBuildings={() => selectPage('buildings')}
            />
          }
          <div id="main-content" className={selectedItem ? 'details-enabled': ''}>
            <aside id="side-nav">
              <ul>
                <li>Carte</li>
                <li>Déplacements</li>
                <li>Alliance</li>
                <li>Empire</li>
              </ul>
            </aside>
            <section id="content">
              {
                city &&
                selectedPage === 'buildings' &&
                <BuildingContentList
                  onSelectBuilding={(building) => setSelectedItem({ type: 'building', data: building })}
                />
              }
              {
                city &&
                selectedPage === 'technologies' &&
                <TechnologyContentList
                  onSelectTechnology={(technology) => setSelectedItem({ type: 'technology', data: technology })}
                />
              }
            </section>
            <aside id="place-nav">
              <ul>
                <li>{city?.name}</li>
              </ul>
            </aside>
          </div>
          {
            selectedItem &&
            <section id="details">
              {
                selectedItem.type === 'building' &&
                <BuildingDetails building={selectedItem.data} />
              }
              {
                selectedItem.type === 'technology' &&
                city &&
                <TechnologyDetails technology={selectedItem.data}/>
              }
            </section>
          }
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
          />
        </TechnologyContextProvider>
      </BuildingContextProvider>
    </main>
  )
}

export default App
