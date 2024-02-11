import { authSliceReducer } from '#auth/slice'
import { citySliceReducer } from '#city/slice'
import { technologySliceReducer } from '#technology/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    city: citySliceReducer,
    technology: technologySliceReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
