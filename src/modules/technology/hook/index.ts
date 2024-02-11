import { useContext, useMemo } from 'react'
import { Technology, TechnologyItem } from '#types'
import { TechnologyContext } from '#technology/hook/context'
import { researchTechnology } from '#technology/api/research'
import { cancelTechnology } from '#technology/api/cancel'
import { TechnologyCode } from '@kroust/swarm-client'
import { technologyFinishResearch } from '#technology/api/finish-research'
import { getTechnology } from '#technology/api/get'
import { useAppDispatch, useAppSelector } from '#store/type'
import { refreshCity } from '#city/slice/thunk'
import { selectCityId } from '#city/slice'
import { listTechnologies } from '#technology/slice/thunk'
import { selectToken } from '#auth/slice'

interface HookTechnology {
  technologies: TechnologyItem[]
  technology: Technology | null
  inProgress?: TechnologyItem
  finishResearch: () => Promise<void>
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
  const { technologies, technology, setTechnology } = useContext(TechnologyContext)
  const token = useAppSelector(selectToken)
  const cityId = useAppSelector(selectCityId)
  const dispatch = useAppDispatch()

  const inProgress = useMemo(() => {
    return technologies.find(technology => technology.research_at)
  }, [technologies])

  const select = async ({ code }: SelectProps) => {
    if (!cityId || !token) {
      return
    }

    const fetchedBuilding = await getTechnology({ token, cityId, technologyCode: code })
    if (!fetchedBuilding) {
      return
    }

    setTechnology(fetchedBuilding)
  }

  const research = async ({ code }: ResearchProps) => {
    if (!cityId || !token) {
      return
    }

    await researchTechnology({
      token,
      cityId,
      code
    })
    dispatch(listTechnologies())
    dispatch(refreshCity())
  }

  const finishResearch = async () => {
    if (!token) {
      return
    }
    await technologyFinishResearch({ token })
    dispatch(listTechnologies())
  }

  const cancel = async () => {
    if (!token) {
      return
    }

    await cancelTechnology({ token })
    dispatch(listTechnologies())
  }

  return {
    technology,
    technologies,
    inProgress,
    select,
    cancel,
    research,
    finishResearch,
  }
}
