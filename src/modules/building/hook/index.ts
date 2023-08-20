import { useContext, useEffect, useMemo } from 'react'
import { Building } from '#shared/types'
import { listBuildings } from '#building/api/list'
import { BuildingContext } from '#building/hook/context'
import { upgradeBuilding } from '#building/api/upgrade'
import { useAuth } from '#auth/hook'
import { cancelBuilding } from '#building/api/cancel'
import { useCity } from '#city/hook'
import { useTimer } from '#shared/hooks/timer'
import { BuildingCode } from '@kroust/swarm-client'
import { buildingFinishUpgrade } from '#building/api/finish-upgrade'

interface HookUseBuilding {
  buildings: Building[]
  inProgress?: {
    code: BuildingCode
    remainingTime: number
  }
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
  const { selectedCityId: cityId } = useCity()
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
    await buildingFinishUpgrade({ token, cityId })
    await list()
    reset()
  }

  const upgrade = async ({ code }: UpgradeProps) => {
    const res = await upgradeBuilding({
      token,
      cityId,
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
  }

  const list = async () => {
    if (!cityId) {
      return
    }

    const data = await listBuildings({ token, cityId })
    if (!data) {
      return
    }

    setBuildings(data.buildings)
  }

  const cancel = async () => {
    await cancelBuilding({ token, cityId })
    await list()
    reset()
  }

  useEffect(() => {
    list()
  }, [cityId])

  return {
    buildings,
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
