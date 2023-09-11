import React from 'react'

import { formatTime, transformDecimals } from '#helpers/transform'

interface Props {
  plastic: number
  mushroom: number
  duration: number
}

export const Cost: React.FC<Props> = ({ plastic, mushroom, duration }) => {
  return <aside id='cost'>
    <h3>Coût</h3>
    <ul>
      <li>Plastique: {transformDecimals(plastic)}</li>
      <li>Champignon: {transformDecimals(mushroom)}</li>
      <li>Durée: {formatTime(duration)}</li>
    </ul>
  </aside>
}
