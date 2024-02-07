import { useContext } from 'react'
import { useAuth } from '#auth/hook'
import { MovementContext } from '#movement/hook/context'
import { listMovements } from '#movement/api/list'
import { Movement, MovementItem } from '#types'
import { finishMovement } from '#movement/api/finish'
import { getMovement } from '#movement/api/get'

interface HookMovement {
  movements: MovementItem[]
  movement: Movement | null
  list: () => Promise<void>
  finish: () => Promise<void>
  select: ({ movementId }: { movementId: string }) => Promise<void>
  deselect: () => void
}

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

  return {
    movement,
    movements,
    list,
    finish,
    select,
    deselect,
  }
}
