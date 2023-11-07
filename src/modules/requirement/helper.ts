import { BuildingItem, TechnologyItem } from '#types'
import { Requirement } from '@kroust/swarm-client'

export const areRequirementsMet = ({
  requirement,
  buildings,
  technologies
}: {
  requirement: Requirement
  buildings: BuildingItem[]
  technologies: TechnologyItem[]
}): boolean => {

  const buildingRequirementMet = requirement.buildings.every(
    r => buildings.some(({ code, level }) => r.code === code && level >= r.level)
  )
  const technologyRequirementMet = requirement.technologies.every(
    r => technologies.some(({ code, level }) => r.code === code && level >= r.level)
  )

  return buildingRequirementMet && technologyRequirementMet
}
