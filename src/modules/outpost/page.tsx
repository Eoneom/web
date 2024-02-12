import React from 'react'

import { formatCoordinates } from '#helpers/transform'
import { useAppSelector } from '#store/type'
import { selectOutpost } from '#outpost/slice'

export const OutpostPage: React.FC = () => {
  const outpost = useAppSelector(selectOutpost)

  return outpost && <section id="content">
    {outpost.id} {formatCoordinates(outpost.coordinates)}
  </section>
}
