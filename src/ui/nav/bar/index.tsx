import React from 'react'
import { useCity } from '#city/hook'
import { NavBarTitle } from '#ui/nav/bar/title'
import { NavBarResources } from '#ui/nav/bar/resources'
import { useOutpost } from '#outpost/hook'
import { formatCoordinates } from '#helpers/transform'

export const NavBar: React.FC = () => {
  const { city } = useCity()
  const { outpost } = useOutpost()
  const text = city ? city.name : outpost ? formatCoordinates(outpost.coordinates) : ''
  const to = city ? `/city/${city.id}` : `/outpost/${outpost?.id}`

  return <nav id='nav-bar'>
    <h3>Eoneom</h3>
    <NavBarTitle to={to} text={text} />
    <NavBarResources city={city} />
  </nav>
}
