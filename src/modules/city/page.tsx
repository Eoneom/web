import { useCity } from '#city/hook'
import React from 'react'

export const CityPage: React.FC = () => {
  const { city } = useCity()
  if (!city) {
    return null
  }

  return <>
    <section id="content">
      <h2>{city.name}</h2>
      <h3>
        Coordonnées: {city.coordinates.sector};{city.coordinates.x};{city.coordinates.y}
      </h3>
    </section>
  </>
}
