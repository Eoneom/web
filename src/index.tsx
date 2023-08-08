import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthContextProvider } from './modules/auth/hook/context'
import { CityContextProvider } from './modules/city/hook/context'

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
