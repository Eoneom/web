import { selectAllCities } from '#city/slice'
import { getCity } from '#city/slice/thunk'
import { resetOutpost } from '#outpost/slice'
import { listOutposts } from '#outpost/slice/thunk'
import { useAppDispatch, useAppSelector } from '#store/type'
import { useNavigate } from 'react-router-dom'

interface HookGo {
  goToFirstCity: () => Promise<void>
}

export const useGo = (): HookGo => {
  const navigate = useNavigate()
  const cities = useAppSelector(selectAllCities)
  const dispatch = useAppDispatch()

  const goToFirstCity = async () => {
    dispatch(listOutposts())
    dispatch(resetOutpost())

    const cityId = cities[0].id
    dispatch(getCity(cityId))
    navigate(`/city/${cityId}`)
  }

  return {
    goToFirstCity
  }
}
