import React, { useState } from 'react'

import { useSync } from '#shared/hooks/sync'
import { SyncDataResponse } from '@kroust/swarm-client'
import { ToastContainer, toast } from 'react-toastify'
import { AuthLoginForm } from '#auth/login-form'
import { Navbar } from '#shared/ui/navbar'
import { BuildingContextProvider } from '#building/hook/context'
import { useAuth } from '#auth/hook'
import { TechnologyContextProvider } from '#technology/hook/context'
import { useCity } from '#city/hook'
import { Sidenav } from '#shared/ui/sidenav'
import { PlaceNav } from '#shared/ui/placenav'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
  const { logout } = useAuth()
  const [city, setCity] = useState<SyncDataResponse['cities'][number] | null>(null)
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

  useSync({ onSync, onError: onSyncError })

  return (
    <main>
      <BuildingContextProvider>
        <TechnologyContextProvider>
          <AuthLoginForm />
          {
            city && <>
              <Navbar city={city}/>
              <div id="main">
                <Sidenav/>
                <Outlet />
                <PlaceNav city={city}/>
              </div>
            </>
          }
        </TechnologyContextProvider>
      </BuildingContextProvider>

      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
    </main>
  )
}

export default App
