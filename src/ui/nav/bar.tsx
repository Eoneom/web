import React from 'react'
import { transformDecimals } from '#helpers/transform'
import { useCity } from '#city/hook'
import { Link } from 'react-router-dom'
import { IconPlastic } from '#ui/icon/plastic'
import { IconMushroom } from '#ui/icon/mushroom'
import { ResourceItem } from '#ui/resource-item'

export const NavBar: React.FC = () => {
  const { city } = useCity()
  if (!city) {
    return null
  }

  const plasticClassName = city.plastic >= city.warehouses_capacity.plastic ? 'danger' : ''
  const mushroomClassName = city.mushroom >= city.warehouses_capacity.mushroom ? 'danger' : ''

  return <nav id='nav-bar'>
    <h3>Swarm</h3>
    <h1><Link to={'/'}>{city.name}</Link></h1>
    <ul>
      <ResourceItem
        className={plasticClassName}
        icon={<IconPlastic />}
        value={transformDecimals(city.plastic)}
      />

      <ResourceItem
        className={mushroomClassName}
        icon={<IconMushroom />}
        value={transformDecimals(city.mushroom)}
      />
    </ul>
  </nav>
}
