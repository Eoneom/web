import React  from 'react'
import { useCity } from '#city/hook'
import { formatCoordinates } from '#helpers/transform'

export const CityPage: React.FC = () => {
  const { city } = useCity()

  return city && <section id="content">
    <h2>{city.name}</h2>
    <h3>
        Coordonnées: {formatCoordinates(city.coordinates)}
    </h3>
  </section>
}
