import React from 'react'
import { Technology } from '#types'
import { TechnologyTranslations } from '#technology/translations'
import { useTechnology } from '#technology/hook'
import { Button } from '#ui/button'
import { Requirement } from '#requirement/index'
import { LayoutDetailsContent } from '#ui/layout/details/content'
import { Cost } from '#cost/index'

interface Props {
  technology: Technology
}

export const TechnologyDetails: React.FC<Props> = ({ technology }) => {
  const { research, inProgress } = useTechnology()
  const { name } = TechnologyTranslations[technology.code]

  return <>
    <LayoutDetailsContent>
      <h2>{name}</h2>
      {!inProgress && <Button onClick={() => research({ code: technology.code })}>Rechercher</Button>}
    </LayoutDetailsContent>
    <Requirement requirements={technology.requirement} />
    <Cost {...technology.research_cost}/>
  </>
}
