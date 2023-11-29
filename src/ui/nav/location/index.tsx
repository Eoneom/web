import { useCity } from '#city/hook'
import React from 'react'
import { NavLocationCities } from '#ui/nav/location/city'
import { NavLocationOutposts } from '#ui/nav/location/outpost'
import { useOutpost } from '#outpost/hook'

export const NavLocation: React.FC = () => {
  const { cities } = useCity()
  const { outposts } = useOutpost()

  return <nav id="location">
    { Boolean(cities.length) && <NavLocationCities cities={cities} /> }
    { Boolean(outposts.length) && <NavLocationOutposts outposts={outposts} />}
  </nav>
}
