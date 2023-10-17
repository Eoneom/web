import { useContext, useMemo } from 'react'
import { Building, BuildingItem } from '#types'
import { listBuildings } from '#building/api/list'
import { BuildingContext } from '#building/hook/context'
import { upgradeBuilding } from '#building/api/upgrade'
import { useAuth } from '#auth/hook'
import { cancelBuilding } from '#building/api/cancel'
import { useCity } from '#city/hook'
import { BuildingCode } from '@kroust/swarm-client'
import { buildingFinishUpgrade } from '#building/api/finish-upgrade'
import { toast } from 'react-toastify'
import { getBuilding } from '#building/api/get'

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

  const { token } = useAuth()
  const { city, refresh: refreshCity } = useCity()

  const inProgress = useMemo(() => {
    return buildings.find(building => building.upgrade_at)
  }, [buildings])

  const select = async ({ code }: SelectProps) => {
    if (!city) {
      return
    }

    const fetchedBuilding = await getBuilding({ token, cityId: city.id, buildingCode: code })
    if (!fetchedBuilding) {
      return
    }

    setBuilding(fetchedBuilding)
  }

  const finishUpgrade = async () => {
    if (!city) {
      return
    }

    await buildingFinishUpgrade({ token, cityId: city.id })
    if (building) {
      await select({ code: building.code })
    }
    await list()
    await refreshCity()
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
    await refreshCity()
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
    await refreshCity()
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
