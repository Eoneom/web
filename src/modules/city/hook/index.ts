import { useContext, useMemo } from 'react'
import { CityContext } from '#city/hook/context'
import { City } from '#shared/types'
import { listCities } from '#city/api/list'
import { useAuth } from '#auth/hook'

interface HookCity {
  selectedCityId: string
  selectedCity?: City
  list: () => void
}

export const useCity = (): HookCity => {
  const { token } = useAuth()
  const {
    selectedCityId,
    setSelectedCityId,
    cities,
    setCities
  } = useContext(CityContext)

  const list = async () => {
    const response = await listCities({ token })
    if (!response) {
      return
    }

    setCities(response.cities)
    if (!selectedCityId) {
      setSelectedCityId(response.cities[0].id)
    }
  }

  const selectedCity = useMemo(() => {
    return cities.find(city => city.id === selectedCityId)
  }, [ cities, selectedCityId])

  return {
    selectedCityId,
    selectedCity,
    list
  }
}
