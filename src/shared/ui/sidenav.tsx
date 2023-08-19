import React from 'react'
import { Link } from 'react-router-dom'

export const Sidenav: React.FC = () => {
  return (
    <aside id="sidenav">
      <h2>Ville</h2>
      <ul>
        <li><Link to={'building'}>Construction</Link></li>
        <li><Link to={'technology'}>Recherche</Link></li>
        <li>Recrutement</li>
      </ul>

      <h2>Monde</h2>
      <ul>
        <li><Link to={'map'}>Carte</Link></li>
        <li>Déplacement</li>
        <li>Alliance</li>
        <li>Empire</li>
      </ul>

      <h2>Transmissions</h2>
      <ul>
        <li>Rapport</li>
        <li>Messagerie</li>
      </ul>

      <h2>Compte</h2>
      <ul>
        <li>Paramètres</li>
        <li>Se déconnecter</li>
      </ul>
    </aside>
  )
}
