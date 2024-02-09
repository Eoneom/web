import { useContext } from 'react'
import { useAuth } from '#auth/hook'
import { MovementContext } from '#movement/hook/context'
import { listMovements } from '#movement/api/list'
import { Movement, MovementItem } from '#types'
import { finishMovement } from '#movement/api/finish'
import { getMovement } from '#movement/api/get'
import { Coordinates, MovementAction, TroupCode } from '@kroust/swarm-client'
import { estimateMovement } from '#movement/api/estimate'
import { createMovement } from '#movement/api/create'

interface HookMovement {
  movements: MovementItem[]
  movement: Movement | null
  create: (params: CreateMovementParams) => Promise<{ deletedOutpostId?: string }>
  estimate: (params: EstimateMovementParams) => Promise<EstimateMovementResult>
  list: () => Promise<void>
  finish: () => Promise<void>
  select: ({ movementId }: { movementId: string }) => Promise<void>
  deselect: () => void
}

interface CreateMovementParams {
  action: MovementAction
  origin: Coordinates
  destination: Coordinates
  troups: {
    code: TroupCode
    count: number
  }[]
}

interface EstimateMovementParams {
  origin: Coordinates
  destination: Coordinates
  troupCodes: TroupCode[]
}

type EstimateMovementResult = {
  distance: number
  speed: number
  duration: number
} | null

export const useMovement = (): HookMovement => {
  const { movement, setMovement, movements, setMovements } = useContext(MovementContext)
  const { token } = useAuth()

  const select = async ({ movementId }: { movementId: string }) => {
    const data = await getMovement({ token, movementId })
    if (!data) {
      return
    }

    setMovement(data)
  }

  const deselect = () => {
    setMovement(null)
  }

  const list = async () => {
    const data = await listMovements({ token })
    if (!data) {
      return
    }

    setMovements(data.movements)
  }

  const finish = async () => {
    await finishMovement({ token })
    await list()
  }

  const estimate = async ({ origin, destination, troupCodes }: EstimateMovementParams): Promise<EstimateMovementResult> => {
    const data = await estimateMovement({ token, origin, destination, troupCodes })
    if (!data) {
      return null
    }

    return data
  }

  const create = async ({ action, origin, destination, troups }: CreateMovementParams): Promise<{ deletedOutpostId?: string }> => {
    const result = await createMovement({ token, action,  origin, destination, troups })

    await list()

    return result
  }

  return {
    movement,
    movements,
    create,
    estimate,
    list,
    finish,
    select,
    deselect,
  }
}
