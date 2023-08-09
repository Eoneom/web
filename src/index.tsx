import React from 'react'
import ReactDOM from 'react-dom/client'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import './styles.css'
import App from './App'

import { AuthContextProvider } from '#auth/hook/context'
import { CityContextProvider } from '#city/hook/context'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CityContextProvider>
        <App />
      </CityContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
