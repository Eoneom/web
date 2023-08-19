import React from 'react'

import { useSync } from '#shared/hooks/sync'
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
  const { list, selectedCity } = useCity()

  const onSyncError = async (errorCode: string) => {
    if (errorCode === 'auth:not-found') {
      await logout()
    } else {
      toast.error(errorCode)
    }
  }

  useSync({ onSync: () => list(), onError: onSyncError })

  return (
    <main>
      <BuildingContextProvider>
        <TechnologyContextProvider>
          <AuthLoginForm />
          {
            selectedCity && <>
              <Navbar />
              <div id="main">
                <Sidenav />
                <Outlet />
                <PlaceNav />
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
