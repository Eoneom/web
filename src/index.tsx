import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { AuthContextProvider } from '#auth/hook/context'
import { CityContextProvider } from '#city/hook/context'
import { BuildingPage } from '#building/page'
import { TechnologyPage } from '#technology/page'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

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
