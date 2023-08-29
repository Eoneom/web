import { useContext, useEffect, useMemo } from 'react'
import {  Troup } from '#shared/types'
import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { useTimer } from '#shared/hook/timer'
import { TroupCode } from '@kroust/swarm-client'
import { TroupContext } from '#troup/hook/context'
import { listTroups } from '#troup/api/list'
import { recruitTroup } from '#troup/api/recruit'
import { progressRecruitTroup } from '#troup/api/progress-recruit'

interface HookTechnology {
  troups: Troup[]
  inProgress?: {
    code: TroupCode
    remainingTime: number
  }
  list: () => Promise<void>
  recruit: (props: RecruitProps) => Promise<void>
}

interface RecruitProps {
  code: TroupCode
  count: number
}

export const useTroup = (): HookTechnology => {
  const { troups, setTroups } = useContext(TroupContext)
  const { token } = useAuth()
  const { selectedCityId: cityId } = useCity()
  const troupInProgress = useMemo(() => {
    return troups.find(troup => troup.ongoing_recruitment)
  }, [troups])

  const { remainingTime, reset } = useTimer({
    doneAt: troupInProgress?.ongoing_recruitment?.finish_at,
    onDone: async () => {
      await progressRecruit()
      reset()
    },
    onTick: async () => {
      await progressRecruit()
    },
    tickDuration: troupInProgress?.cost.duration
  })

  const recruit = async ({ code, count }: RecruitProps) => {
    const res = await recruitTroup({
      token,
      cityId,
      code,
      count
    })
    if (!res) {
      return
    }

    await list()
  }

  const progressRecruit = async () => {
    const res = await progressRecruitTroup({ token, cityId })
    if (!res) {
      return
    }

    await list()
  }

  const list = async () => {
    const data = await listTroups({ token, cityId })
    if (!data) {
      return
    }

    setTroups(data.troups)
  }

  useEffect(() => {
    list()
  }, [cityId])

  return {
    troups,
    list,
    recruit,
    inProgress: troupInProgress
      ? {
        code: troupInProgress.code,
        remainingTime
      }
      : undefined
  }
}
