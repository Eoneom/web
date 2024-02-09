import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthLoginForm } from '#auth/login-form'
import { useAuth } from '#auth/hook'
import { Header } from '#ui/header'
import { useCity } from '#city/hook'
import { NavMenu } from '#ui/nav/menu'
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
    token ? <GameProvider>
      <Header />
      <div id="main">
        <NavMenu />
        <main>
          <Outlet />
        </main>

        <NavLocation />
      </div>

      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
    </GameProvider> : <AuthLoginForm />
  )
}

export default App
