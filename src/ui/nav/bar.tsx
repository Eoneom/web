import React from 'react'
import { transformDecimals, transformEarnings } from '#helpers/transform'
import { useCity } from '#city/hook'
import { Link } from 'react-router-dom'
import { IconPlastic } from '#ui/icon/plastic'
import { IconMushroom } from '#ui/icon/mushroom'
import { ResourceItem } from '#ui/resource-item'
import { Tooltip } from '#ui/tooltip'

export const NavBar: React.FC = () => {
  const { city } = useCity()
  if (!city) {
    return null
  }

  const plasticClassName = city.plastic >= city.warehouses_capacity.plastic ? 'danger' : ''
  const mushroomClassName = city.mushroom >= city.warehouses_capacity.mushroom ? 'danger' : ''
  const plasticEarningsPerHour = transformEarnings(city.earnings_per_second.plastic)
  const mushroomEarningsPerHour = transformEarnings(city.earnings_per_second.mushroom)

  const plasticTooltipContent = <>
    Prod = <strong>{plasticEarningsPerHour}</strong><br />
    Max = <strong>{transformDecimals(city.warehouses_capacity.plastic)}</strong>
  </>

  const mushroomTooltipContent = <>
    Prod = <strong>{mushroomEarningsPerHour}</strong><br />
    Max = <strong>{transformDecimals(city.warehouses_capacity.mushroom)}</strong>
  </>

  return <nav id='nav-bar'>
    <h3>Swarm</h3>
    <h1><Link to={'/'}>{city.name}</Link></h1>
    <ul>
      <li>
        <Tooltip content={plasticTooltipContent} position='bottom'>
          <ResourceItem
            className={plasticClassName}
            icon={<IconPlastic />}
            value={transformDecimals(city.plastic)}
          />
        </Tooltip>
      </li>
      <li>
        <Tooltip content={mushroomTooltipContent} position='bottom'>
          <ResourceItem
            className={mushroomClassName}
            icon={<IconMushroom />}
            value={transformDecimals(city.mushroom)}
          />
        </Tooltip>
      </li>
    </ul>
  </nav>
}
