import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'

export const doSignup = async ({ playerName, cityName }: {  playerName: string, cityName: string }): Promise<void> => {
  const res = await client.player.signup({ player_name: playerName, city_name: cityName })
  if (isError(res)) {
    throw new Error(res.error_code)
  }

  return
}
