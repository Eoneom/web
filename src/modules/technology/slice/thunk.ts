import { selectToken } from '#auth/slice'
import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { createAppAsyncThunk } from '#store/type'
import { toast } from 'react-toastify'

export const listTechnologies = createAppAsyncThunk('technology/list', async (_, { getState }) => {
  const token = selectToken(getState())
  if (!token) {
    return
  }

  const res = await client.technology.list(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data?.technologies ?? null
})
