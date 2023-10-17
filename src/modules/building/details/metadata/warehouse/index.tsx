import React from 'react'

interface Props {
  currentCapacity: number
  nextCapacity: number
}

export const BuildingDetailsMetadataWarehouse: React.FC<Props> = ({ currentCapacity, nextCapacity }) => {
  return <>
    <h3>Capacité</h3>
    <p>Actuelle: <strong>{currentCapacity}</strong></p>
    <p>Suivante: <strong>{nextCapacity}</strong></p>
  </>
}
