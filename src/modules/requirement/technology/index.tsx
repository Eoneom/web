import { Requirement } from '@kroust/swarm-client'
import React from 'react'
import { useTechnology } from '#technology/hook'
import { TechnologyTranslations } from '#technology/translations'

interface Props {
  requirement: Requirement['technologies'][number]
}

export const RequirementTechnology: React.FC<Props> = ({ requirement }) => {
  const { technologies } = useTechnology()
  const requiredTechnologyLevel = technologies.find(technology => technology.code === requirement.code)?.level ?? 0
  const isMetClassName = requiredTechnologyLevel >= requirement.level ? 'success' : 'danger'

  return <li key={requirement.code} className={isMetClassName}>
    {TechnologyTranslations[requirement.code].name} {requirement.level}
  </li>
}
