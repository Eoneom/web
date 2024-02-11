import { listTechnologies } from '#technology/slice/thunk'
import { TechnologyItem } from '#types'
import { createSlice } from '@reduxjs/toolkit'

interface TechnologyState {
  technologies: TechnologyItem[]
}

const initialState: TechnologyState = {
  technologies: []
}

export const technologySlice = createSlice({
  name: 'technology',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(listTechnologies.fulfilled, (state, action) => {
      state.technologies = action.payload ?? []
    })
  }
})
export const technologySliceReducer = technologySlice.reducer
