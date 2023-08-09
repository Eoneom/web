import { useContext } from 'react'
import { CityContext } from '#city/hook/context'

interface HookCity {
  selectedCityId: string
  selectCity: (cityId: string) => void
}

export const useCity = (): HookCity => {
  const { selectedCityId, setSelectedCityId } = useContext(CityContext)

  const selectCity = (cityId: string) => {
    setSelectedCityId(cityId)
  }

  return {
    selectedCityId,
    selectCity,
  }
}
