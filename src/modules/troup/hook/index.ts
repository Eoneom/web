import { useContext, useMemo } from 'react'
import {  Troup } from '#types'
import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { useTimer } from '#hook/timer'
import { TroupCode } from '@kroust/swarm-client'
import { TroupContext } from '#troup/hook/context'
import { listTroups } from '#troup/api/list'
import { recruitTroup } from '#troup/api/recruit'
import { progressRecruitTroup } from '#troup/api/progress-recruit'
import { cancelTroup } from '#troup/api/cancel'
import { troupExplore } from '#troup/api/explore'

interface HookTroup {
  troups: Troup[]
  inProgress?: {
    code: TroupCode
    remainingTime: number
  }
  selectedTroup: Troup | null
  selectTroup: (id: string) => void
  list: () => Promise<void>
  recruit: (props: RecruitProps) => Promise<void>
  cancel: () => Promise<void>
  explore: (params: { coordinates: { x: number, y: number, sector: number } }) => Promise<void>
}

interface RecruitProps {
  code: TroupCode
  count: number
}

export const useTroup = (): HookTroup => {
  const {
    troups,
    setTroups,
    selectedTroupId,
    setSelectedTroupId
  } = useContext(TroupContext)
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

  const selectTroup = (id: string) => {
    setSelectedTroupId(id)
  }

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

  const explore = async ({coordinates}: {coordinates: { x: number, y: number, sector: number}}) => {
    await troupExplore({ token, cityId, coordinates })
  }

  const cancel = async () => {
    await cancelTroup({ token, cityId })
    await list()
    reset()
  }

  const list = async () => {
    const data = await listTroups({ token, cityId })
    if (!data) {
      return
    }

    setTroups(data.troups)
  }

  const selectedTroup = useMemo(() => {
    return troups.find(troup => troup.id === selectedTroupId) ?? null
  }, [ troups, selectedTroupId])

  return {
    troups,
    selectedTroup,
    inProgress: troupInProgress
      ? {
        code: troupInProgress.code,
        remainingTime
      }
      : undefined,
    list,
    recruit,
    cancel,
    explore,
    selectTroup,
  }
}
