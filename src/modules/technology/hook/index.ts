import { useContext, useEffect } from 'react'
import { Technology } from '#shared/types'
import { TechnologyContext } from '#technology/hook/context'
import { useAuth } from '#auth/hook'
import { listTechnologies } from '#technology/api/list'
import { researchTechnology } from '#technology/api/research'
import { cancelTechnology } from '#technology/api/cancel'
import { useCity } from '#city/hook'

interface HookTechnology {
  technologies: Technology[]
  list: () => Promise<void>
  research: (props: ResearchProps) => Promise<void>
  cancel: () => Promise<void>
}

interface ResearchProps {
  technologyCode: string
}

export const useTechnology = (): HookTechnology => {
  const { technologies, setTechnologies } = useContext(TechnologyContext)
  const { token } = useAuth()
  const { selectedCityId: cityId } = useCity()

  const research = async ({ technologyCode }: ResearchProps) => {
    const res = await researchTechnology({
      token,
      cityId,
      technologyCode
    })
    if (!res) {
      return
    }

    const { research_at } = res
    const new_technologies = [...technologies]
    const index = technologies.findIndex(technology => technology.code === technologyCode)
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
    research
  }
}
