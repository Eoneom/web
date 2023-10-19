import { useContext } from 'react'
import { CityContext } from '#city/hook/context'
import { City } from '#types'
import { listCities } from '#city/api/list'
import { useAuth } from '#auth/hook'
import { cityGather } from '#city/api/gather'
import { getCity } from '#city/api/get'

interface HookCity {
  city: City | null
  cities: { id: string, name: string }[]
  list: () => Promise<void>
  gather: () => Promise<void>
  refresh: () => Promise<void>
}

export const useCity = (): HookCity => {
  const { token } = useAuth()
  const {
    city,
    setCity,
    cities,
    setCities
  } = useContext(CityContext)

  const select = async ({ cityId }: { cityId: string }) => {
    const city = await getCity({ token, cityId })
    if (!city) {
      return
    }

    setCity(city)
  }

  const refresh = async () => {
    if (!city) {
      return
    }

    const updated_city = await getCity({ token, cityId: city.id })
    if (!updated_city) {
      return
    }

    setCity(updated_city)
  }

  const list = async () => {
    const response = await listCities({ token })
    if (!response) {
      return
    }

    setCities(response.cities)

    if (!city) {
      await select({ cityId: response.cities[0].id })
    }
  }

  const gather = async () => {
    if (!city) {
      return
    }

    await cityGather({ token, cityId: city.id })
    await refresh()
  }

  return {
    city,
    cities,
    list,
    gather,
    refresh
  }
}
