import React from 'react'

import { formatCoordinates } from '#helpers/transform'
import { useOutpost } from '#outpost/hook'

export const OutpostPage: React.FC = () => {
  const { outpost } = useOutpost()

  return outpost && <section id="content">
    {outpost.id} {formatCoordinates(outpost.coordinates)}
  </section>
}
