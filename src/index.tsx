import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { OutpostContextProvider } from '#outpost/hook/context'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { ReportContextProvider } from '#communication/report/hook/context'
import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <OutpostContextProvider>
        <ReportContextProvider>
          <RouterProvider router={router} />
        </ReportContextProvider>
      </OutpostContextProvider>
    </Provider>
  </React.StrictMode>
)
