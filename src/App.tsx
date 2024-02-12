import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthLoginForm } from '#auth/login-form'
import { Header } from '#ui/header'
import { NavMenu } from '#ui/nav/menu'
import { NavLocation } from '#ui/nav/location'
import { GameProvider } from '#helpers/provider'
import { useOutpost } from '#outpost/hook'
import { useAppDispatch, useAppSelector } from './store/type'
import { listCities } from '#city/slice/thunk'
import { retrieveStoredToken } from '#auth/slice/thunk'
import { selectToken } from '#auth/slice'
import { countUnreadReports } from '#communication/report/slice/thunk'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { list: listOutposts } = useOutpost()
  const token = useAppSelector(selectToken)

  useEffect(() => {
    dispatch(retrieveStoredToken())
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    dispatch(listCities())
    listOutposts()
    dispatch(countUnreadReports())
  }, [token])

  if (!token) {
    return <AuthLoginForm />
  }

  return <GameProvider>
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
  </GameProvider>
}

export default App
