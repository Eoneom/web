import React from 'react'
import { Technology } from '../../shared/types'

interface Props {
  technology: Technology
}

export const TechnologyDetails: React.FC<Props> = ({ technology }) => {
  return <section className="details">
    <aside><h3>Pré-requis</h3></aside>
    <article><h2>{technology.code}</h2></article>
    <aside>
      <h3>Coût</h3>
      <li>
        <ul>Plastique: {technology.research_cost.plastic}</ul>
        <ul>Champignon: {technology.research_cost.mushroom}</ul>
        <ul>Durée: {technology.research_cost.duration}</ul>
      </li>
    </aside>
  </section>
}
