import { toast } from 'react-toastify'
import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { Coordinates, MovementAction, TroupCode } from '@kroust/swarm-client'

export const createMovement = async ({
  token,
  origin,
  destination,
  troups,
  action
}: {
  action: MovementAction
  token: string
  origin: Coordinates
  destination: Coordinates
  troups: { code: TroupCode, count: number }[]
}): Promise<{ deletedOutpostId?: string }> => {
  const res = await client.troup.createMovement(token, { action, origin, destination, troups })
  if (isError(res)) {
    toast.error(res.error_code)
    return { }
  }

  toast.success('Les troupes sont en route')
  return { deletedOutpostId: res.data?.deleted_outpost_id }
}
