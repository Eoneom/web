import React from 'react'
import { useCity } from '#city/hook'
import { HeaderTitle } from '#ui/header/title'
import { HeaderResources } from '#ui/header/resources'
import { useOutpost } from '#outpost/hook'
import { formatCoordinates } from '#helpers/transform'

export const Header: React.FC = () => {
  const { city } = useCity()
  const { outpost } = useOutpost()
  const text = city ? city.name : outpost ? formatCoordinates(outpost.coordinates) : ''
  const to = city ? `/city/${city.id}` : `/outpost/${outpost?.id}`

  return <header>
    <h3>Eoneom</h3>
    <HeaderTitle to={to} text={text} />
    <HeaderResources city={city} />
  </header>
}
