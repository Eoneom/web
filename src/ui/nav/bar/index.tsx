import React from 'react'
import { useCity } from '#city/hook'
import { NavBarTitle } from '#ui/nav/bar/title'
import { NavBarResources } from '#ui/nav/bar/resources'

export const NavBar: React.FC = () => {
  const { city } = useCity()
  const text = city ? city.name : 'yoo'
  const to = city ? `/city/${city.id}` : '/outpost'

  return <nav id='nav-bar'>
    <h3>Eoneom</h3>
    <NavBarTitle to={to} text={text} />
    <NavBarResources city={city} />
  </nav>
}
