import { useContext } from 'react'
import { Building } from '../../../shared/types'
import { listBuildings } from '../api/list'
import { BuildingContext } from './context'
import { upgradeBuilding } from '../api/upgrade'
import { useAuth } from '../../auth/hook'

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
}

export const useBuilding = ({ cityId }: HookUseBuildingProps): HookUseBuilding => {
  const { buildings, setBuildings } = useContext(BuildingContext)
  const { token } = useAuth()

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
