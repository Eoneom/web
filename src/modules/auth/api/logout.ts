import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const logout = async ({ token }: { token: string }): Promise<void> => {
  const res = await client.player.logout(token)
  if (isError(res)) {
    throw new Error(res.error_code)
  }
}
