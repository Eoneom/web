import { authSliceReducer } from '#auth/slice'
import { buildingSliceReducer } from '#building/slice'
import { citySliceReducer } from '#city/slice'
import { reportSliceReducer } from '#communication/report/slice'
import { outpostSliceReducer } from '#outpost/slice'
import { technologySliceReducer } from '#technology/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    building: buildingSliceReducer,
    city: citySliceReducer,
    outpost: outpostSliceReducer,
    report: reportSliceReducer,
    technology: technologySliceReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
