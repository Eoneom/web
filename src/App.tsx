import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthLoginForm } from '#auth/login-form'
import { Navbar } from '#shared/ui/navbar'
import { BuildingContextProvider } from '#building/hook/context'
import { TechnologyContextProvider } from '#technology/hook/context'
import { useCity } from '#city/hook'
import { Sidenav } from '#shared/ui/sidenav'
import { PlaceNav } from '#shared/ui/placenav'
import { useAuth } from '#auth/hook'

const App: React.FC = () => {
  const { list, selectedCity } = useCity()
  const { token } = useAuth()
  useEffect(() => {
    if (!token) {
      return
    }

    list()
  }, [token])

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
