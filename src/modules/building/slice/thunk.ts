import { selectToken } from '#auth/slice'
import { selectBuildingCode } from '#building/slice'
import { selectCityId } from '#city/slice'
import { refreshCity } from '#city/slice/thunk'
import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { createAppAsyncThunk, useAppSelector } from '#store/type'
import { BuildingCode } from '@kroust/swarm-client'

export const getBuilding = createAppAsyncThunk('building/get', async (code: BuildingCode, { rejectWithValue, getState }) => {
  const token = selectToken(getState())
  const cityId = selectCityId(getState())
  if (!cityId || !token) {
    throw rejectWithValue('no token or city id')
  }


  const res = await client.building.get(token, { city_id: cityId, building_code: code })
  if (isError(res)) {
    throw rejectWithValue(res.error_code)
  }

  if (!res.data) {
    throw rejectWithValue('no data')
  }

  return res.data
})

export const listBuildings = createAppAsyncThunk('building/list', async (_, { rejectWithValue, getState }) => {
  const token = selectToken(getState())
  const cityId = selectCityId(getState())
  if (!token || !cityId) {
    return []
  }

  const res = await client.building.list(token, { city_id: cityId })
  if (isError(res)) {
    throw rejectWithValue(res.error_code)
  }

  if (!res.data) {
    throw rejectWithValue('empty response')
  }

  return res.data.buildings
})

export const upgradeBuilding = createAppAsyncThunk('building/upgrade', async (code: BuildingCode, { dispatch, rejectWithValue, getState }) => {
  const token = selectToken(getState())
  const cityId = selectCityId(getState())
  if (!cityId || !token) {
    return
  }

  const res = await client.building.upgrade(token, {
    city_id: cityId,
    building_code: code
  })
  if (isError(res)) {
    throw rejectWithValue(res.error_code)
  }

  const buildingCode = selectBuildingCode(getState())
  if (buildingCode === code) {
    dispatch(getBuilding(buildingCode))
  }

  dispatch(listBuildings())
  dispatch(refreshCity())
})

export const finishBuildingUpgrade = createAppAsyncThunk('building/finish', async (_, { dispatch, rejectWithValue, getState }) => {
  const token = selectToken(getState())
  const cityId = selectCityId(getState())
  if (!cityId || !token) {
    return
  }

  const res = await client.building.finishUpgrade(token, { city_id: cityId })
  if (isError(res)) {
    rejectWithValue(res.error_code)
    return
  }

  const buildingCode = useAppSelector(selectBuildingCode)
  if (buildingCode) {
    dispatch(getBuilding(buildingCode))
  }

  dispatch(listBuildings())
  dispatch(refreshCity())
})

export const cancelBuildingUpgrade = createAppAsyncThunk('building/cancel', async (_, { dispatch, rejectWithValue, getState }) => {
  const token = selectToken(getState())
  const cityId = selectCityId(getState())
  if (!cityId || !token) {
    return
  }

  const res = await client.building.cancel(token, {city_id: cityId })
  if (isError(res)) {
    throw rejectWithValue(res.error_code)
  }

  dispatch(listBuildings())
  dispatch(refreshCity())
})
