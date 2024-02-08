import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { useReport } from '#communication/report/hook'
import { getActiveClassName } from '#helpers/classname'
import { getUrlPrefix } from '#helpers/url'
import { useOutpost } from '#outpost/hook'

export const NavMenu: React.FC = () => {
  const { city } = useCity()
  const { outpost } = useOutpost()
  const { unreadCount } = useReport()
  const { logout } = useAuth()

  const urlPrefix = getUrlPrefix({ city, outpost })

  return (
    <nav id="menu">
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
        <li><NavLink className={getActiveClassName} to={`${urlPrefix}/map`}>Carte</NavLink></li>
        <li><NavLink className={getActiveClassName} to={`${urlPrefix}/movement`}>Déplacement</NavLink></li>
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
        <li><NavLink to={''} onClick={(e) => {e.preventDefault(); logout()}}>Se déconnecter</NavLink></li>
      </ul>
    </nav>
  )
}
