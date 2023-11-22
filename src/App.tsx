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
import { useOutpost } from '#outpost/hook'
import { useReport } from '#communication/report/hook'

const App: React.FC = () => {
  const { list: listCities } = useCity()
  const { list: listOutposts } = useOutpost()
  const { token, retrieveStoredToken } = useAuth()
  const { countUnread } = useReport()

  useEffect(() => {
    retrieveStoredToken()
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    listCities()
    listOutposts()
    countUnread()
  }, [token])

  return (
    <main>
      <GameProvider>
        <AuthLoginForm />
        { token && <>
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
