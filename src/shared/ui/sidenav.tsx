import React from 'react'

interface Props {
  onGoToBuildings: () => void
  onGoToTechnologies: () => void
}

export const Sidenav: React.FC<Props> = ({ onGoToBuildings, onGoToTechnologies }) => {
  return (
    <aside id="sidenav">
      <h2>Ville</h2>
      <ul>
        <li><a href="#" onClick={() => onGoToBuildings()}>Construction</a></li>
        <li><a href="#" onClick={() => onGoToTechnologies()}>Recherche</a></li>
        <li>Recrutement</li>
      </ul>

      <h2>Monde</h2>
      <ul>
        <li>Carte</li>
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
