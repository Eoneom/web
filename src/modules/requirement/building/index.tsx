import { Requirement } from '@kroust/swarm-client'
import React from 'react'
import { BuildingTranslations } from '#building/translations'
import { useBuilding } from '#building/hook'

interface Props {
  requirement: Requirement['buildings'][number]
}

export const RequirementBuilding: React.FC<Props> = ({ requirement }) => {
  const { buildings } = useBuilding()
  const requiredBuildingLevel = buildings.find(building => building.code === requirement.code)?.level ?? 0
  const isMetClassName = requiredBuildingLevel >= requirement.level ? 'success' : 'danger'

  return <li key={requirement.code} className={isMetClassName}>
    {BuildingTranslations[requirement.code].name} {requirement.level}
  </li>
}
