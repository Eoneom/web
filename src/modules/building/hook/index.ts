import { useContext, useEffect } from 'react'
import { Building } from '#shared/types'
import { listBuildings } from '#building/api/list'
import { BuildingContext } from '#building/hook/context'
import { upgradeBuilding } from '#building/api/upgrade'
import { useAuth } from '#auth/hook'
import { cancelBuilding } from '#building/api/cancel'
import { useCity } from '#city/hook'

interface HookUseBuilding {
  buildings: Building[]
  list: () => Promise<void>
  upgrade: (props: UpgradeProps) => Promise<void>
  cancel: () => Promise<void>
}

interface UpgradeProps {
  buildingCode: string
}

export const useBuilding = (): HookUseBuilding => {
  const { buildings, setBuildings } = useContext(BuildingContext)
  const { token } = useAuth()
  const { selectedCityId: cityId } = useCity()

  const upgrade = async ({ buildingCode }: UpgradeProps) => {
    const res = await upgradeBuilding({
      token,
      cityId,
      buildingCode
    })
    if (!res) {
      return
    }

    const { upgrade_at } = res
    const new_buildings = [...buildings]
    const index = buildings.findIndex(building => building.code === buildingCode)
    if (index === -1) {
      return
    }

    new_buildings[index].upgrade_at = upgrade_at

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
  }

  useEffect(() => {
    list()
  }, [cityId])

  return {
    buildings,
    list,
    cancel,
    upgrade
  }
}
