import { toast } from 'react-toastify'
import { client } from '#helpers/api'
import { isError } from '#helpers/assertion'
import { TroupCode } from '@kroust/swarm-client'

export const troupBase = async ({
  token,
  origin,
  destination,
  troups
}: {
  token: string
  origin: { x: number, y: number, sector: number }
  destination: { x: number, y: number, sector: number }
  troups: { code: TroupCode, count: number }[]
}): Promise<void> => {
  const res = await client.troup.base(token, { origin, destination, troups })
  if (isError(res)) {
    toast.error(res.error_code)
    return
  }

  toast.success('Base lancée')
}
