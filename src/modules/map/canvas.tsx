import { useAuth } from '#auth/hook'
import { useCity } from '#city/hook'
import { useWorld } from './hook/world'
import { CellType } from '@kroust/swarm-client'
import React, { useEffect, useRef } from 'react'

export const MapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { fetch, sector } = useWorld()
  const { token } = useAuth()
  const { selectedCity } = useCity()

  useEffect(() => {
    if (!token || !selectedCity) {
      return
    }

    fetch({ token, sector: selectedCity.coordinates.sector })
  }, [token, selectedCity])

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) {
      return
    }
    if (!sector) {
      return
    }

    const X_CELL_SIZE = canvasRef.current.width / Math.sqrt(sector.cells.length)
    const Y_CELL_SIZE = canvasRef.current.height /  Math.sqrt(sector.cells.length)

    sector.cells.forEach(cell => {
      switch(cell.type) {
      case CellType.FOREST:
        ctx.fillStyle = '#0F0'
        break
      case CellType.RUINS:
        ctx.fillStyle = '#F00'
        break
      case CellType.LAKE:
        ctx.fillStyle = '#00F'
        break
      }

      ctx.fillRect(cell.coordinates.x*X_CELL_SIZE, cell.coordinates.y*Y_CELL_SIZE, X_CELL_SIZE, Y_CELL_SIZE)
      ctx.strokeRect(cell.coordinates.x*X_CELL_SIZE, cell.coordinates.y*Y_CELL_SIZE, X_CELL_SIZE, Y_CELL_SIZE)
    })
  }, [sector])

  if (!selectedCity) {
    return null
  }

  return <section style={{height: '100%'}} >
    Secteur {selectedCity.coordinates.sector}
    <canvas id="map" ref={canvasRef} width="1000" height="400"></canvas>
  </section>
}
