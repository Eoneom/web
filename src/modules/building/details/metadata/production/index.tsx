import React from 'react'

import { transformEarnings } from '#helpers/transform'

interface Props {
  currentProduction: number
  nextProduction: number
}

export const BuildingDetailsMetadataProduction: React.FC<Props> = ({ currentProduction, nextProduction }) => {
  return <>
    <p>
      Production actuelle: <strong>{transformEarnings(currentProduction)}</strong><br />
      Production suivante: <strong>{transformEarnings(nextProduction)}</strong>
    </p>
  </>
}
