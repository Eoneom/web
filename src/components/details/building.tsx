import React from 'react'
import { Building } from '../../types'

interface Props {
  building: Building
  cost: {
    plastic: number
    mushroom: number
  }
}

export const DetailsBuilding: React.FC<Props> = ({ building, cost }) => {
  return <section className="details">
    <aside className="building-prerequesite"><h3>Pré-requis</h3></aside>
    <article><h2>{building.name}</h2></article>
    <aside className="building-action">
      <h3>Coût</h3>
      <li>
        <ul>Plastique: {cost.plastic}</ul>
        <ul>Champignon: {cost.mushroom}</ul>
      </li>
    </aside>
  </section>
}
