import { useContext, useMemo } from 'react'
import { Building } from '#types'
import { listBuildings } from '#building/api/list'
import { BuildingContext } from '#building/hook/context'
import { upgradeBuilding } from '#building/api/upgrade'
import { useAuth } from '#auth/hook'
import { cancelBuilding } from '#building/api/cancel'
import { useCity } from '#city/hook'
import { useTimer } from '#hook/timer'
import { BuildingCode } from '@kroust/swarm-client'
import { buildingFinishUpgrade } from '#building/api/finish-upgrade'
import { toast } from 'react-toastify'

interface HookUseBuilding {
  buildings: Building[]
  inProgress?: {
    code: BuildingCode
    remainingTime: number
  }
  levelsTotal: number
  list: () => Promise<void>
  upgrade: (props: UpgradeProps) => Promise<void>
  cancel: () => Promise<void>
}

interface UpgradeProps {
  code: BuildingCode
}

export const useBuilding = (): HookUseBuilding => {
  const { buildings, setBuildings } = useContext(BuildingContext)
  const { token } = useAuth()
  const { city, refresh } = useCity()
  const buildingInProgress = useMemo(() => {
    return buildings.find(building => building.upgrade_at)
  }, [buildings])

  const { remainingTime, reset } = useTimer({
    doneAt: buildingInProgress?.upgrade_at,
    onDone: async () => {
      await finishUpgrade()
    }
  })

  const finishUpgrade = async () => {
    if (!city) {
      return
    }

    await buildingFinishUpgrade({ token, cityId: city.id })
    await list()
    await refresh()
    reset()
  }

  const upgrade = async ({ code }: UpgradeProps) => {
    if (!city) {
      return
    }

    const res = await upgradeBuilding({
      token,
      cityId: city.id,
      code
    })
    if (!res) {
      return
    }

    const { upgrade_at } = res
    const new_buildings = buildings.map((building) => {
      if (building.code !== code) {
        return building
      }

      return {
        ...building,
        upgrade_at
      }
    })

    setBuildings(new_buildings)
    await refresh()
  }

  const list = async () => {
    if (!city?.id) {
      toast.error('cityId is undefined')
      return
    }

    const data = await listBuildings({ token, cityId: city.id })
    if (!data) {
      return
    }

    setBuildings(data.buildings)
  }

  const cancel = async () => {
    if (!city) {
      return
    }

    await cancelBuilding({ token, cityId: city.id })
    await list()
    reset()
  }

  const levelsTotal = useMemo(() => {
    return buildings.reduce((acc, {level}) => acc + level, 0)
  }, [buildings])

  return {
    buildings,
    levelsTotal,
    list,
    cancel,
    upgrade,
    inProgress: buildingInProgress
      ? {
        code:buildingInProgress.code,
        remainingTime
      }
      : undefined
  }
}
