import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { selectCityId } from '#city/slice'
import { createAppAsyncThunk } from '#store/type'
import { selectToken } from '#auth/slice'

export const gatherCity = createAppAsyncThunk('city/gather', async (_, { getState, dispatch }) => {
  const token = selectToken(getState())
  if (!token) {
    throw new Error('empty token')
  }

  const cityId = selectCityId(getState())
  if (!cityId) {
    return
  }

  await client.city.gather(token, { city_id: cityId })

  dispatch(getCity(cityId))
})

export const refreshCity = createAppAsyncThunk('city/refresh', async (_, { getState, dispatch }) => {
  const token = selectToken(getState())
  if (!token) {
    throw new Error('empty token')
  }

  const cityId = selectCityId(getState())
  if (!cityId) {
    return
  }

  dispatch(getCity(cityId))
})

export const getCity = createAppAsyncThunk('city/get', async (cityId: string, { getState }) => {
  const token = selectToken(getState())
  if (!token) {
    throw new Error('empty token')
  }

  const res = await client.city.get(token, { city_id: cityId })
  if (isError(res)) {
    throw new Error(res.error_code)
  }

  if (!res.data) {
    throw new Error('Ville non trouvée')
  }

  return res.data
})

export const listCities = createAppAsyncThunk('city/list', async (_, { getState }) => {
  const token = selectToken(getState())
  if (!token) {
    throw new Error('empty token')
  }

  const res = await client.city.list(token)
  if (isError(res)) {
    throw new Error(res.error_code)
  }

  if (!res.data) {
    throw new Error('data not found')
  }

  const { data } = res
  if (!data.cities.length) {
    throw new Error('there is no city here 😬')
  }

  return res.data?.cities ?? null
})
