import { Requirement } from '@kroust/swarm-client'
import React from 'react'
import { BuildingTranslations } from '#building/translations'
import { useBuilding } from '#building/hook'

interface Props {
  requirement: Requirement['buildings'][number]
}

export const RequirementBuilding: React.FC<Props> = ({ requirement }) => {
  const { buildings } = useBuilding()
  const required_building = buildings.find(building => building.code === requirement.code)
  const is_requirement_met = required_building?.level ?? 0 >= requirement.level
  return <li key={requirement.code}>
    {BuildingTranslations[requirement.code].name} {requirement.level} {is_requirement_met ? 'bien': 'pas bien'}
  </li>
}
