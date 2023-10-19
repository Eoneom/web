import { useContext, useMemo } from 'react'
import { Technology } from '#types'
import { TechnologyContext } from '#technology/hook/context'
import { useAuth } from '#auth/hook'
import { listTechnologies } from '#technology/api/list'
import { researchTechnology } from '#technology/api/research'
import { cancelTechnology } from '#technology/api/cancel'
import { useCity } from '#city/hook'
import { useTimer } from '#hook/timer'
import { TechnologyCode } from '@kroust/swarm-client'
import { technologyFinishResearch } from '#technology/api/finish-research'

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
  const { city, refresh } = useCity()
  const technologyInProgress = useMemo(() => {
    return technologies.find(technology => technology.research_at)
  }, [technologies])

  const { remainingTime, reset } = useTimer({
    doneAt: technologyInProgress?.research_at,
    onDone: async () => {
      await finishResearch()
    }
  })

  const research = async ({ code }: ResearchProps) => {
    if (!city) {
      return
    }

    await researchTechnology({
      token,
      cityId: city.id,
      code
    })
    await list()
    await refresh()
  }

  const finishResearch = async () => {
    await technologyFinishResearch({ token })
    await list()
    reset()
  }

  const list = async () => {
    if (!city) {
      return
    }

    const data = await listTechnologies({ token, cityId: city.id })
    if (!data) {
      return
    }

    setTechnologies(data.technologies)
  }

  const cancel = async () => {
    await cancelTechnology({ token })
    await list()
  }

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
