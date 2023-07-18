import { client } from '..'
import { isError } from '../../utils'

export const login = async ({
  player_name
}: {
  player_name: string
}): Promise<string> => {
  const upgrade_res = await client.player.login({ player_name })
  if (isError(upgrade_res)) {
    throw new Error(upgrade_res.error_code)
  }

  if (!upgrade_res.data?.token) {
    throw new Error('token:not-in:response')
  }

  return upgrade_res.data?.token
}
