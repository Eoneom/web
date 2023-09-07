import { Requirement } from '@kroust/swarm-client'
import React from 'react'
import { useTechnology } from '#technology/hook'
import { TechnologyTranslations } from '#technology/translations'

interface Props {
  requirement: Requirement['technologies'][number]
}

export const RequirementTechnology: React.FC<Props> = ({ requirement }) => {
  const { technologies } = useTechnology()
  const required_technology = technologies.find(technology => technology.code === requirement.code)
  const is_requirement_met = required_technology?.level ?? 0 >= requirement.level
  return <li key={requirement.code}>
    {TechnologyTranslations[requirement.code].name} {requirement.level} {is_requirement_met ? 'bien': 'pas bien'}
  </li>
}
