import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { BuildingPage } from '#building/page'
import { TechnologyPage } from '#technology/page'
import { MapPage } from '#map/page'
import { CityPage } from '#city/page'
import { TroupPage } from '#troup/page'
import { MovementPage } from '#troup/movement/page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <CityPage />
      },
      {
        path: 'building',
        element: <BuildingPage />
      },
      {
        path: 'technology',
        element: <TechnologyPage />
      },
      {
        path: 'troup',
        element: <TroupPage />
      },
      {
        path: 'map',
        element: <MapPage />
      },
      {
        path: 'movement',
        element: <MovementPage />
      }
    ]
  },
])
