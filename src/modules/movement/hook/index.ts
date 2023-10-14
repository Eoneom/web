import { useContext, useEffect } from 'react'
import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { MovementContext } from '#movement/hook/context'
import { listMovements } from '#troup/api/list-movement'
import { Movement } from '#types'
import { finishMovement } from '#troup/api/finish-movement'

interface HookMovement {
  movements: Movement[]
  list: () => Promise<void>
  finish: (props: { movementId: string }) => Promise<void>
}

export const useMovement = (): HookMovement => {
  const { movements, setMovements } = useContext(MovementContext)
  const { token } = useAuth()
  const { city } = useCity()

  const list = async () => {
    if (!city) {
      return
    }

    const data = await listMovements({ token, cityId: city.id })
    if (!data) {
      return
    }

    setMovements(data.movements)
  }

  const finish = async ({ movementId }: { movementId: string }) => {
    await finishMovement({ token, movementId })
    await list()
  }

  useEffect(() => {
    list()
  }, [city?.id])

  return {
    movements,
    list,
    finish,
  }
}
