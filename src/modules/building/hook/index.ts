import { useContext, useMemo } from 'react'
import { Building, BuildingItem } from '#types'
import { listBuildings } from '#building/api/list'
import { BuildingContext } from '#building/hook/context'
import { upgradeBuilding } from '#building/api/upgrade'
import { cancelBuilding } from '#building/api/cancel'
import { BuildingCode } from '@kroust/swarm-client'
import { buildingFinishUpgrade } from '#building/api/finish-upgrade'
import { getBuilding } from '#building/api/get'
import { useAppDispatch, useAppSelector } from '#store/type'
import { refreshCity } from '#city/slice/thunk'
import { selectCityId } from '#city/slice'
import { selectToken } from '#auth/slice'

interface HookUseBuilding {
  building: Building | null
  buildings: BuildingItem[]
  inProgress?: BuildingItem
  levelsTotal: number

  cancel: () => Promise<void>
  list: () => Promise<void>
  upgrade: (props: UpgradeProps) => Promise<void>
  select: (props: SelectProps) => Promise<void>
  finishUpgrade: () => Promise<void>
}

interface SelectProps {
  code: BuildingCode
}

interface UpgradeProps {
  code: BuildingCode
}

export const useBuilding = (): HookUseBuilding => {
  const {
    building,
    setBuilding,

    buildings,
    setBuildings
  } = useContext(BuildingContext)

  const token = useAppSelector(selectToken)
  const cityId = useAppSelector(selectCityId)
  const dispatch = useAppDispatch()

  const inProgress = useMemo(() => {
    return buildings.find(building => building.upgrade_at)
  }, [buildings])

  const select = async ({ code }: SelectProps) => {
    if (!cityId || !token) {
      return
    }

    const fetchedBuilding = await getBuilding({ token, cityId, buildingCode: code })
    if (!fetchedBuilding) {
      return
    }

    setBuilding(fetchedBuilding)
  }

  const finishUpgrade = async () => {
    if (!cityId || !token) {
      return
    }

    await buildingFinishUpgrade({ token, cityId })
    if (building) {
      await select({ code: building.code })
    }
    await list()
    await dispatch(refreshCity())
  }

  const upgrade = async ({ code }: UpgradeProps) => {
    if (!cityId || !token) {
      return
    }

    await upgradeBuilding({
      token,
      cityId,
      code
    })
    await list()
    await dispatch(refreshCity())

    if (code === building?.code) {
      await select({ code })
    }
  }

  const list = async () => {
    if (!cityId || !token) {
      return
    }

    const data = await listBuildings({ token, cityId })
    if (!data) {
      return
    }

    setBuildings(data.buildings)
  }

  const cancel = async () => {
    if (!cityId || !token) {
      return
    }

    await cancelBuilding({ token, cityId })
    await list()
    await dispatch(refreshCity())
  }

  const levelsTotal = useMemo(() => {
    return buildings.reduce((acc, {level}) => acc + level, 0)
  }, [buildings])

  return {
    building,
    buildings,
    levelsTotal,
    inProgress,
    list,
    cancel,
    upgrade,
    select,
    finishUpgrade
  }
}
