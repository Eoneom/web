import React from 'react'
import { transformDailyEarnings, transformDecimals, transformHourlyEarnings } from '#helpers/transform'
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

  const warnCapacity = 70/100

  const plasticClassName = city.plastic >= city.warehouses_capacity.plastic ? 'danger' : ''
  const plasticEarningsPerHour = transformHourlyEarnings(city.earnings_per_second.plastic)
  const plasticEarningsPerDay = transformDailyEarnings(city.earnings_per_second.plastic)
  const plasticStorageLevel = Math.round(city.plastic / city.warehouses_capacity.plastic*100 * 100)/100
  const plasticProgressClassName = city.plastic >= city.warehouses_capacity.plastic * warnCapacity ? 'warn' : ''

  const mushroomClassName = city.mushroom >= city.warehouses_capacity.mushroom ? 'danger' : ''
  const mushroomEarningsPerHour = transformHourlyEarnings(city.earnings_per_second.mushroom)
  const mushroomEarningsPerDay = transformDailyEarnings(city.earnings_per_second.mushroom)
  const mushroomStorageLevel = Math.round(city.mushroom / city.warehouses_capacity.mushroom*100 * 100)/100
  const mushroomProgressClassName = city.mushroom >= city.warehouses_capacity.mushroom * warnCapacity ? 'warn' : ''

  const plasticTooltipContent = <>
    {plasticEarningsPerHour}<br />
    {plasticEarningsPerDay}<br />
    Max = {transformDecimals(city.warehouses_capacity.plastic)}
  </>

  const mushroomTooltipContent = <>
    {mushroomEarningsPerHour}<br />
    {mushroomEarningsPerDay}<br />
    Max = {transformDecimals(city.warehouses_capacity.mushroom)}
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
        <Tooltip content={`${plasticStorageLevel}%`} position='bottom'>
          <progress
            className={plasticProgressClassName}
            value={city.plastic}
            max={city.warehouses_capacity.plastic}
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
        <Tooltip content={`${mushroomStorageLevel}%`} position='bottom'>
          <progress
            className={mushroomProgressClassName}
            value={city.mushroom}
            max={city.warehouses_capacity.mushroom}
          />
        </Tooltip>
      </li>
    </ul>
  </nav>
}
