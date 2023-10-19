import { transformDecimals } from '#helpers/transform'
import React from 'react'

interface Props {
  currentCapacity: number
  nextCapacity: number
}

export const BuildingDetailsMetadataWarehouse: React.FC<Props> = ({ currentCapacity, nextCapacity }) => {
  return <>
    <h3>Capacité</h3>
    <p>Actuelle: <strong>{transformDecimals(currentCapacity)}</strong></p>
    <p>Suivante: <strong>{transformDecimals(nextCapacity)}</strong></p>
  </>
}
