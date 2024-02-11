import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const listTechnologies = createAsyncThunk('technologies/list', async (token: string) => {
  const res = await client.technology.list(token)
  if (isError(res)) {
    toast.error(res.error_code)
    return null
  }

  return res.data?.technologies ?? null
})
