import React, { useState } from 'react'
import { MapCanvas } from '#map/canvas'
import { useCity } from '#city/hook'

export const MapPage: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ x: number, y: number} | null>(null)
  const {selectedCity } = useCity()
  return <>
    <section id="content" className={selectedCell ? 'details-enabled': ''}>
      <MapCanvas onCellSelected={setSelectedCell}/>
    </section>
    {selectedCell && <section id="details">
      <article id="details-content">
        <h2>Cellule sélectionnée: ({selectedCell.x};{selectedCell.y})</h2>
        {selectedCity?.coordinates.x === selectedCell.x && selectedCell.y === selectedCity?.coordinates.y && <>
          {selectedCity.name}
        </>
        }
      </article>
    </section>}
  </>
}
