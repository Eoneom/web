import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { AuthContextProvider } from '#auth/hook/context'
import { CityContextProvider } from '#city/hook/context'
import { OutpostContextProvider } from '#outpost/hook/context'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CityContextProvider>
        <OutpostContextProvider>
          <RouterProvider router={router} />
        </OutpostContextProvider>
      </CityContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
