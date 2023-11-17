import React  from 'react'
import { useCity } from '#city/hook'

export const CityPage: React.FC = () => {
  const { city } = useCity()

  return city && <>
    <section id="content">
      <h2>{city.name}</h2>
      <h3>
        Coordonnées: {city.coordinates.sector};{city.coordinates.x};{city.coordinates.y}
      </h3>
    </section>
  </>
}
