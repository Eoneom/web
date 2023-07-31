import { client } from '..'
import { isError } from '../../helpers/assertion'

export const login = async ({ playerName }: {  playerName: string}): Promise<string> => {
  const res = await client.player.login({ player_name: playerName})
  if (isError(res)) {
    throw new Error(res.error_code)
  }

  if (!res.data?.token) {
    throw new Error('token:not-in:response')
  }

  return res.data?.token
}
