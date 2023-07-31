import { useContext } from 'react'
import { Building } from '../../../types'
import { listBuildings } from '../../../api/building/list'
import { BuildingContext } from './context'
import { upgradeBuilding } from '../../../api/building/upgrade'

interface HookUseBuilding {
  buildings: Building[]
  list: () => Promise<void>
  upgrade: (props: UpgradeProps) => void
}

interface UpgradeProps {
  buildingCode: string
}

interface HookUseBuildingProps {
  cityId: string
  token: string
}

export const useBuilding = ({ token, cityId }: HookUseBuildingProps): HookUseBuilding => {
  const { buildings, setBuildings } = useContext(BuildingContext)

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
    const data = await listBuildings({ token, cityId })
    if (!data) {
      return
    }

    setBuildings(data.buildings)
  }

  return {
    buildings,
    list,
    upgrade
  }
}
