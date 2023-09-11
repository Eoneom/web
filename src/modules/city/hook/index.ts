import { useContext, useMemo } from 'react'
import { CityContext } from '#city/hook/context'
import { City } from '#types'
import { listCities } from '#city/api/list'
import { useAuth } from '#auth/hook'
import { cityGather } from '#city/api/gather'

interface HookCity {
  selectedCityId: string
  selectedCity: City | null
  list: () => Promise<void>
  gather: () => Promise<void>
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
    return cities.find(city => city.id === selectedCityId) ?? null
  }, [ cities, selectedCityId ])

  const gather = async () => {
    if (!selectedCityId) {
      return
    }

    const res = await cityGather({ token, cityId: selectedCityId})
    if (!res) {
      return
    }

    const new_cities = cities.map(city => {
      if(city.id !== selectedCityId) {
        return city
      }

      return {
        ...city,
        plastic: res.plastic,
        mushroom: res.mushroom
      }
    })

    setCities(new_cities)
  }


  return {
    selectedCityId,
    selectedCity,
    list,
    gather
  }
}
