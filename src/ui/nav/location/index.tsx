import { useCity } from '#city/hook'
import React from 'react'
import { useOutpost } from '#outpost/hook'
import { NavLocationCities } from '#ui/nav/location/city'
import { NavLocationOutposts } from '#ui/nav/location/outpost'

export const NavLocation: React.FC = () => {
  const { cities } = useCity()
  const { outposts } = useOutpost()

  return <aside id="nav-location">
    { Boolean(cities.length) && <NavLocationCities cities={cities} /> }
    { Boolean(outposts.length) && <NavLocationOutposts outposts={outposts} />}
  </aside>
}
