import { selectToken } from '#auth/slice'
import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { createAppAsyncThunk } from '#store/type'

export const getOutpost = createAppAsyncThunk('outpost/get', async (outpostId: string, { getState }) => {
  const token = selectToken(getState())
  if (!token) {
    throw new Error('no token')
  }

  const res = await client.outpost.get(token, { outpost_id: outpostId })
  if (isError(res)) {
    throw new Error(res.error_code)
  }

  if (!res.data) {
    throw new Error('data not found')
  }

  return res.data
})

export const listOutposts = createAppAsyncThunk('outpost/list', async (_, { getState }) => {
  const token = selectToken(getState())
  if (!token) {
    throw new Error('no token')
  }

  const res = await client.outpost.list(token)
  if (isError(res)) {
    throw new Error(res.error_code)
  }

  if (!res.data) {
    throw new Error('data not found')
  }

  return res.data.outposts
})
