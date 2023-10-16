import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthLoginForm } from '#auth/login-form'
import { useAuth } from '#auth/hook'
import { NavBar } from '#ui/nav/bar'
import { useCity } from '#city/hook'
import { NavSide } from '#ui/nav/side'
import { NavLocation } from '#ui/nav/location'
import { GameProvider } from '#helpers/provider'

const App: React.FC = () => {
  const { list, gather, city } = useCity()
  const { token, retrieveStoredToken } = useAuth()

  useEffect(() => {
    retrieveStoredToken()
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    list()
  }, [token])

  useEffect(() => {
    const interval = setInterval(() => {
      gather()
    }, 10000)

    if (city?.id) {
      gather()
    }

    return () => clearInterval(interval)
  }, [city?.id])

  return (
    <main>
      <GameProvider>
        <AuthLoginForm />
        {
          city && <>
            <NavBar />
            <div id="main">
              <NavSide />
              <Outlet />
              <NavLocation />
            </div>
          </>
        }
      </GameProvider>

      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
    </main>
  )
}

export default App
