import React from 'react'
import { NavLocationCities } from '#ui/nav/location/city'
import { NavLocationOutposts } from '#ui/nav/location/outpost'
import { useOutpost } from '#outpost/hook'
import { useAppSelector } from '#store/type'
import { selectAllCities } from '#city/slice'

export const NavLocation: React.FC = () => {
  const cities = useAppSelector(selectAllCities)
  const { outposts } = useOutpost()

  return <nav id="location">
    { Boolean(cities.length) && <NavLocationCities cities={cities} /> }
    { Boolean(outposts.length) && <NavLocationOutposts outposts={outposts} />}
  </nav>
}
