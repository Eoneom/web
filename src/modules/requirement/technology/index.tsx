import { TechnologyListDataResponse } from '@kroust/swarm-client'
import React from 'react'
import { useTechnology } from '../../technology/hook'
import { TechnologyTranslations } from '../../technology/translations'

interface Props {
  requirement: TechnologyListDataResponse['technologies'][number]['requirements']['technologies'][number]
  cityId: string
}

export const RequirementTechnology: React.FC<Props> = ({ requirement, cityId }) => {
  const { technologies } = useTechnology({ cityId })
  const required_technology = technologies.find(technology => technology.code === requirement.code)
  const is_requirement_met = required_technology?.level ?? 0 >= requirement.level
  return <li key={requirement.code}>
    {TechnologyTranslations[requirement.code].name} {requirement.level} {is_requirement_met ? 'bien': 'pas bien'}
  </li>
}
