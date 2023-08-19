import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import App from './App'
import { AuthContextProvider } from '#auth/hook/context'
import { CityContextProvider } from '#city/hook/context'
import { BuildingPage } from '#building/page'
import { TechnologyPage } from '#technology/page'
import { WorldPage } from '#map/page'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'building',
        element: <BuildingPage />
      },
      {
        path: 'technology',
        element: <TechnologyPage />
      },
      {
        path: 'map',
        element: <WorldPage />
      }
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CityContextProvider>
        <RouterProvider router={router} />
      </CityContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
