import { useContext, useEffect, useMemo } from 'react'
import { Technology } from '#shared/types'
import { TechnologyContext } from '#technology/hook/context'
import { useAuth } from '#auth/hook'
import { listTechnologies } from '#technology/api/list'
import { researchTechnology } from '#technology/api/research'
import { cancelTechnology } from '#technology/api/cancel'
import { useCity } from '#city/hook'
import { useTimer } from '#shared/hooks/timer'
import { TechnologyCode } from '@kroust/swarm-client'

interface HookTechnology {
  technologies: Technology[]
  inProgress?: {
    code: TechnologyCode
    remainingTime: number
  }
  list: () => Promise<void>
  research: (props: ResearchProps) => Promise<void>
  cancel: () => Promise<void>
}

interface ResearchProps {
  code: TechnologyCode
}

export const useTechnology = (): HookTechnology => {
  const { technologies, setTechnologies } = useContext(TechnologyContext)
  const { token } = useAuth()
  const { selectedCityId: cityId } = useCity()
  const technologyInProgress = useMemo(() => {
    return technologies.find(technology => technology.research_at)
  }, [technologies])

  const { remainingTime, reset } = useTimer({
    doneAt: technologyInProgress?.research_at,
    onDone: async () => {
      await list()
      reset()
    }
  })

  const research = async ({ code }: ResearchProps) => {
    const res = await researchTechnology({
      token,
      cityId,
      code
    })
    if (!res) {
      return
    }

    const { research_at } = res
    const new_technologies = [...technologies]
    const index = technologies.findIndex(technology => technology.code === code)
    if (index === -1) {
      return
    }

    new_technologies[index].research_at = research_at

    setTechnologies(new_technologies)
  }

  const list = async () => {
    const data = await listTechnologies({ token, cityId })
    if (!data) {
      return
    }

    setTechnologies(data.technologies)
  }

  const cancel = async () => {
    await cancelTechnology({ token })
    await list()
  }

  useEffect(() => {
    list()
  }, [cityId])

  return {
    technologies,
    cancel,
    list,
    research,
    inProgress: technologyInProgress
      ? {
        code: technologyInProgress.code,
        remainingTime
      }
      : undefined
  }
}
