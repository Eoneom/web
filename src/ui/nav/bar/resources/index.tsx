import { City } from '#types'
import { IconMushroom } from '#ui/icon/mushroom'
import { IconPlastic } from '#ui/icon/plastic'
import { NavBarResourcesItem } from '#ui/nav/bar/resources/item'
import React from 'react'

interface Props {
  city: City | null
}

export const NavBarResources: React.FC<Props> = ({ city }) => {
  if (!city) {
    return <ul></ul>
  }

  return <ul>
    <NavBarResourcesItem
      value={city.plastic}
      icon={<IconPlastic />}
      warehouse_capacity={city.warehouses_capacity.plastic}
      earnings_per_second={city.earnings_per_second.plastic}
    />
    <NavBarResourcesItem
      value={city.mushroom}
      icon={<IconMushroom />}
      warehouse_capacity={city.warehouses_capacity.mushroom}
      earnings_per_second={city.earnings_per_second.mushroom}
    />
  </ul>
}
