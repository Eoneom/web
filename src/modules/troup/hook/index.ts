import { useContext, useMemo } from 'react'
import {  Troup } from '#types'
import { Coordinates, MovementAction, TroupCode } from '@kroust/swarm-client'
import { TroupContext } from '#troup/hook/context'
import { listCityTroups } from '#troup/api/list/city'
import { recruitTroup } from '#troup/api/recruit'
import { progressRecruitTroup } from '#troup/api/progress-recruit'
import { cancelTroup } from '#troup/api/cancel'
import { createMovement } from '#movement/api/create'
import { useOutpost } from '#outpost/hook'
import { listOutpostTroups } from '#troup/api/list/outpost'
import { refreshCity } from '#city/slice/thunk'
import { useAppDispatch, useAppSelector } from '#store/type'
import { selectCityId } from '#city/slice'
import { selectToken } from '#auth/slice'

interface HookTroup {
  troups: Troup[]
  inProgress?: Troup
  selectedTroup: Troup | null
  selectTroup: (id: string) => void
  list: () => Promise<void>
  recruit: (props: RecruitProps) => Promise<void>
  cancel: () => Promise<void>
  explore: (params: ExploreProps) => Promise<void>
  base: (params: BaseProps) => Promise<void>
  progressRecruit: () => Promise<void>
}

interface BaseProps {
  origin: Coordinates
  destination: Coordinates
  troups: {code: TroupCode, count: number}[]
}

interface ExploreProps {
  origin: Coordinates
  destination: Coordinates
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
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const cityId = useAppSelector(selectCityId)
  const { outpost } = useOutpost()

  const inProgress = useMemo(() => {
    return troups.find(troup => troup.ongoing_recruitment)
  }, [troups])

  const selectTroup = (id: string) => {
    setSelectedTroupId(id)
  }

  const recruit = async ({ code, count }: RecruitProps) => {
    if (!cityId || !token) {
      return
    }
    await recruitTroup({
      token,
      cityId,
      code,
      count
    })
    await list()
    dispatch(refreshCity())
  }

  const progressRecruit = async () => {
    if (!cityId || !token) {
      return
    }

    const res = await progressRecruitTroup({ token, cityId })
    if (!res) {
      return
    }

    await list()
  }

  const base = async ({ origin, destination, troups  }: BaseProps) => {
    if (!token) {
      return
    }

    await createMovement({
      token,
      action: MovementAction.BASE,
      origin,
      destination,
      troups
    })
  }

  const explore = async ({ origin, destination }: ExploreProps) => {
    if (!token) {
      return
    }

    await createMovement({
      token,
      action: MovementAction.EXPLORE,
      origin,
      destination,
      troups: [{code: TroupCode.EXPLORER, count: 1}]
    })
  }

  const cancel = async () => {
    if (!cityId || !token) {
      return
    }

    await cancelTroup({ token, cityId })
    await list()
    dispatch(refreshCity())
  }

  const list = async () => {
    if (!cityId && !outpost || !token) {
      return
    }

    const data = cityId ?
      await listCityTroups({ token, cityId }) : outpost ?
        await listOutpostTroups({ token, outpostId: outpost.id}) :
        null
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
    inProgress,
    base,
    list,
    recruit,
    cancel,
    explore,
    selectTroup,
    progressRecruit
  }
}
