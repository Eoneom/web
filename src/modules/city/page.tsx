import { useCity } from '#city/hook'
import React from 'react'

export const CityPage: React.FC = () => {
  const { selectedCity } = useCity()
  if (!selectedCity) {
    return null
  }

  return <>
    <section id="content">
      <h2>{selectedCity.name}</h2>
      <h3>
        Coordonnées: {selectedCity.coordinates.sector};{selectedCity.coordinates.x};{selectedCity.coordinates.y}
      </h3>
    </section>
  </>
}
