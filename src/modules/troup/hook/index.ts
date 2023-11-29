import { useContext, useMemo } from 'react'
import {  Troup } from '#types'
import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { TroupCode } from '@kroust/swarm-client'
import { TroupContext } from '#troup/hook/context'
import { listCityTroups } from '#troup/api/list/city'
import { recruitTroup } from '#troup/api/recruit'
import { progressRecruitTroup } from '#troup/api/progress-recruit'
import { cancelTroup } from '#troup/api/cancel'
import { troupExplore } from '#troup/api/explore'
import { troupBase } from '#troup/api/base'
import { useOutpost } from '#outpost/hook'
import { listOutpostTroups } from '#troup/api/list/outpost'

interface HookTroup {
  troups: Troup[]
  inProgress?: Troup
  selectedTroup: Troup | null
  selectTroup: (id: string) => void
  list: () => Promise<void>
  recruit: (props: RecruitProps) => Promise<void>
  cancel: () => Promise<void>
  explore: (params: { coordinates: { x: number, y: number, sector: number } }) => Promise<void>
  base: (params: BaseProps) => Promise<void>
  progressRecruit: () => Promise<void>
}

interface BaseProps {
  origin: { x: number, y: number, sector: number }
  destination: { x: number, y: number, sector: number }
  troups: {code: TroupCode, count: number}[]
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
  const { city, refresh: refreshCity } = useCity()
  const { outpost } = useOutpost()

  const inProgress = useMemo(() => {
    return troups.find(troup => troup.ongoing_recruitment)
  }, [troups])

  const selectTroup = (id: string) => {
    setSelectedTroupId(id)
  }

  const recruit = async ({ code, count }: RecruitProps) => {
    if (!city) {
      return
    }
    await recruitTroup({
      token,
      cityId: city.id,
      code,
      count
    })
    await list()
    await refreshCity()
  }

  const progressRecruit = async () => {
    if (!city) {
      return
    }

    const res = await progressRecruitTroup({ token, cityId: city.id })
    if (!res) {
      return
    }

    await list()
  }

  const base = async ({ origin, destination, troups  }: BaseProps) => {
    await troupBase({ token, origin, destination, troups })
  }

  const explore = async ({ coordinates }: { coordinates: { x: number, y: number, sector: number }}) => {
    if (!city) {
      return
    }

    await troupExplore({ token, cityId: city.id, coordinates })
  }

  const cancel = async () => {
    if (!city) {
      return
    }

    await cancelTroup({ token, cityId: city.id })
    await list()
    await refreshCity()
  }

  const list = async () => {
    if (!city && !outpost) {
      return
    }

    const data = city ?
      await listCityTroups({ token, cityId: city.id }) : outpost ?
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
