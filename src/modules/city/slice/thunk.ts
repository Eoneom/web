import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { selectCity } from '#city/slice'
import { createAppAsyncThunk } from '#store/type'

export const gatherCity = createAppAsyncThunk('city/gather', async (token: string, { getState, dispatch }) => {
  const city = selectCity(getState())
  if (!city) {
    return
  }

  await client.city.gather(token, { city_id: city.id })

  dispatch(getCity({ token, cityId: city.id }))
})

export const refreshCity = createAppAsyncThunk('city/refresh', async (token: string, { getState, dispatch }) => {
  const city = selectCity(getState())
  if (!city) {
    return
  }

  dispatch(getCity({ token, cityId: city.id }))
})

export const getCity = createAppAsyncThunk('city/get', async ({ token, cityId }: { token: string, cityId: string }, { rejectWithValue }) => {
  const res = await client.city.get(token, { city_id: cityId })
  if (isError(res)) {
    throw rejectWithValue(res.error_code)
  }

  if (!res.data) {
    throw rejectWithValue('Ville non trouvée')
  }

  return res.data
})

export const listCities = createAppAsyncThunk('city/list', async (token: string, { rejectWithValue }) => {
  const res = await client.city.list(token)
  if (isError(res)) {
    throw rejectWithValue(res.error_code)
  }

  if (!res.data) {
    throw rejectWithValue('data not found')
  }

  const { data } = res
  if (!data.cities.length) {
    throw rejectWithValue('there is no city here 😬')
  }

  return res.data?.cities ?? null
})
