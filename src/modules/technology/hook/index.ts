import { useContext } from 'react'
import { Technology } from '../../../shared/types'
import { TechnologyContext } from './context'
import { useAuth } from '../../auth/hook'
import { listTechnologies } from '../api/list'
import { researchTechnology } from '../api/research'

interface HookUseTechnology {
  technologies: Technology[]
  list: () => Promise<void>
  research: (props: ResearchProps) => void
}

interface ResearchProps {
  technologyCode: string
  cityId: string
}

export const useTechnology = (): HookUseTechnology => {
  const { technologies, setTechnologies } = useContext(TechnologyContext)
  const { token } = useAuth()

  const research = async ({ technologyCode, cityId }: ResearchProps) => {
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
    const data = await listTechnologies({ token })
    if (!data) {
      return
    }

    setTechnologies(data.technologies)
  }

  return {
    technologies,
    list,
    research
  }
}
