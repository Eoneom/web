import React from 'react'

import { formatTime, transformDecimals } from '#helpers/transform'
import { useCity } from '#city/hook'

interface Props {
  plastic: number
  mushroom: number
  duration: number
  action?: React.ReactNode
}

export const Cost: React.FC<Props> = ({ plastic, mushroom, duration, action }) => {
  const { city } = useCity()
  const plasticClassName = plastic > (city?.plastic ?? 0) ? 'danger' : 'success'
  const mushroomClassName = mushroom > (city?.mushroom ?? 0) ? 'danger' : 'success'

  return <aside id='cost'>
    <h3>Coût</h3>
    <ul>
      <li className={plasticClassName}>Plastique: {transformDecimals(plastic)}</li>
      <li className={mushroomClassName}>Champignon: {transformDecimals(mushroom)}</li>
      <li>Durée: {formatTime(duration)}</li>
    </ul>
    {action}
  </aside>
}
