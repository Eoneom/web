import { selectCityCoordinates } from '#city/slice'
import { selectOutpostCoordinates } from '#outpost/slice'
import { useAppSelector } from '#store/type'
import { useTroup } from '#troup/hook'
import { TroupTranslations } from '#troup/translations'
import { Button } from '#ui/button'
import { TroupCode } from '@kroust/swarm-client'
import React, { useState } from 'react'

interface Props {
  coordinates: {
    x: number
    y: number
    sector: number
  }
}

export const MapDetailsActionBase: React.FC<Props> = ({ coordinates }) => {
  const { troups, base } = useTroup()
  const cityCoordinates = useAppSelector(selectCityCoordinates)
  const outpostCoordinates = useAppSelector(selectOutpostCoordinates)

  const [troupsToBase, setTroupsToBase] = useState<Partial<Record<TroupCode, number>>>({})

  const handleBase = () => {
    const origin = cityCoordinates ?? outpostCoordinates
    if (!origin) {
      return
    }

    const finalTroups = Object.entries(troupsToBase)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        return {
          code: key as TroupCode,
          count: value
        }
      })

    if (!finalTroups.length) {
      return
    }

    base({
      origin,
      destination: coordinates,
      troups: finalTroups
    })
  }

  return  <>
    <ul>
      {troups.map(troup => {
        const {name} = TroupTranslations[troup.code]
        return <li key={troup.code}>
          {name}
          <input type="number" max={troup.count} onChange={event => setTroupsToBase({
            ...troupsToBase,
            [troup.code]: event.target.value
          })} /> / {troup.count}
          <br />
        </li>
      })}
    </ul>
    <Button onClick={handleBase}>Baser</Button>
  </>
}
