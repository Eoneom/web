import React from 'react'

import { transformEarnings } from '#helpers/transform'

interface Props {
  currentProduction: number
  nextProduction: number
}

export const BuildingDetailsMetadataProduction: React.FC<Props> = ({ currentProduction, nextProduction }) => {
  return <>
    <h3>Production</h3>
    <p>Actuelle: <strong>{transformEarnings(currentProduction)}</strong></p>
    <p>Suivante: <strong>{transformEarnings(nextProduction)}</strong></p>
  </>
}
