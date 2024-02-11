import { useAuth } from '#auth/hook'
import { selectAllCities } from '#city/slice'
import { getCity } from '#city/slice/thunk'
import { useAppDispatch, useAppSelector } from '#store/type'
import { useOutpost } from '#outpost/hook'
import { useNavigate } from 'react-router-dom'

interface HookGo {
  goToFirstCity: () => Promise<void>
}

export const useGo = (): HookGo => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const cities = useAppSelector(selectAllCities)
  const { deselect, list } = useOutpost()
  const dispatch = useAppDispatch()

  const goToFirstCity = async () => {
    await list()
    deselect()

    const cityId = cities[0].id
    dispatch(getCity({ token, cityId }))
    navigate(`/city/${cityId}`)
  }

  return {
    goToFirstCity
  }
}
