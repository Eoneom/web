import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavSide: React.FC = () => {
  const getClassName = ({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''
  return (
    <aside id="nav-side">
      <h2>Ville</h2>
      <ul>
        <li><NavLink className={getClassName} to={'building'}>Construction</NavLink></li>
        <li><NavLink className={getClassName} to={'technology'}>Recherche</NavLink></li>
        <li><NavLink className={getClassName} to={'troup'}>Recrutement</NavLink></li>
      </ul>

      <h2>Monde</h2>
      <ul>
        <li><NavLink className={getClassName} to={'map'}>Carte</NavLink></li>
        <li><NavLink className={getClassName} to={'movement'}>Déplacement</NavLink></li>
        <li>Alliance</li>
        <li>Empire</li>
      </ul>

      <h2>Messages</h2>
      <ul>
        <li><NavLink className={getClassName} to={'report'}>Rapport</NavLink></li>
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
