import { useCity } from '#city/hook'
import { useReport } from '#communication/report/hook'
import { getActiveClassName } from '#helpers/classname'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavSide: React.FC = () => {
  const { city } = useCity()
  const { unreadCount } = useReport()

  return (
    <aside id="nav-side">
      {
        city && (
          <>
            <h2>Ville</h2>
            <ul>
              <li><NavLink className={getActiveClassName} to={`/city/${city.id}/building`}>Construction</NavLink></li>
              <li><NavLink className={getActiveClassName} to={`/city/${city.id}/technology`}>Recherche</NavLink></li>
              <li><NavLink className={getActiveClassName} to={`/city/${city.id}/troup`}>Recrutement</NavLink></li>
            </ul>
          </>
        )
      }

      <h2>Monde</h2>
      <ul>
        <li><NavLink className={getActiveClassName} to={'map'}>Carte</NavLink></li>
        <li><NavLink className={getActiveClassName} to={'movement'}>Déplacement</NavLink></li>
        <li>Alliance</li>
        <li>Empire</li>
      </ul>

      <h2>Messages</h2>
      <ul>
        <li><NavLink className={getActiveClassName} to={'report'}>Rapport ({unreadCount})</NavLink></li>
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
