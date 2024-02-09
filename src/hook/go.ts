import { useCity } from '#city/hook'
import { useOutpost } from '#outpost/hook'
import { useNavigate } from 'react-router-dom'

interface HookGo {
  goToFirstCity: () => Promise<void>
}

export const useGo = (): HookGo => {
  const navigate = useNavigate()
  const { select, cities } = useCity()
  const { deselect, list } = useOutpost()

  const goToFirstCity = async () => {
    await list()
    deselect()

    const cityId = cities[0].id
    select({ cityId })
    navigate(`/city/${cityId}`)
  }

  return {
    goToFirstCity
  }
}
