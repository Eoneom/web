import { useContext, useMemo } from 'react'
import { Technology, TechnologyItem } from '#types'
import { TechnologyContext } from '#technology/hook/context'
import { useAuth } from '#auth/hook'
import { listTechnologies } from '#technology/api/list'
import { researchTechnology } from '#technology/api/research'
import { cancelTechnology } from '#technology/api/cancel'
import { useCity } from '#city/hook'
import { useTimer } from '#hook/timer'
import { TechnologyCode } from '@kroust/swarm-client'
import { technologyFinishResearch } from '#technology/api/finish-research'
import { getTechnology } from '#technology/api/get'

interface HookTechnology {
  technologies: TechnologyItem[]
  technology: Technology | null
  inProgress?: {
    code: TechnologyCode
    remainingTime: number
  }
  list: () => Promise<void>
  research: (props: ResearchProps) => Promise<void>
  cancel: () => Promise<void>
  select: (props: SelectProps) => Promise<void>
}

interface SelectProps {
  code: TechnologyCode
}

interface ResearchProps {
  code: TechnologyCode
}

export const useTechnology = (): HookTechnology => {
  const { technologies, setTechnologies, technology, setTechnology } = useContext(TechnologyContext)
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

  const select = async ({ code }: SelectProps) => {
    if (!city) {
      return
    }

    const fetchedBuilding = await getTechnology({ token, cityId: city.id, technologyCode: code })
    if (!fetchedBuilding) {
      return
    }

    setTechnology(fetchedBuilding)
  }

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

    const data = await listTechnologies({ token })
    if (!data) {
      return
    }

    setTechnologies(data.technologies)
  }

  const cancel = async () => {
    await cancelTechnology({ token })
    await list()
  }

  const inProgress = useMemo(() => {
    return technologyInProgress
      ? {
        code: technologyInProgress.code,
        remainingTime
      }
      : undefined
  }, [technologyInProgress])

  return {
    technology,
    technologies,
    inProgress,
    select,
    cancel,
    list,
    research,
  }
}
