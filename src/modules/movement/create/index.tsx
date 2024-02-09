import { useCity } from '#city/hook'
import { useGo } from '#hook/go'
import { MovementCreateAction } from '#movement/create/action'
import { MovementCreateDestination } from '#movement/create/destination'
import { MovementCreateEstimation } from '#movement/create/estimation'
import { MovementCreateTroups } from '#movement/create/troups'
import { MovementCreateWarning } from '#movement/create/warning'
import { useMovement } from '#movement/hook'
import { useOutpost } from '#outpost/hook'
import { useTroup } from '#troup/hook'
import { MovementEstimation } from '#types'
import { Coordinates, MovementAction, OutpostType, TroupCode } from '@kroust/swarm-client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const MovementCreate: React.FC = () => {
  const { troups } = useTroup()
  const { city } = useCity()
  const { outpost } = useOutpost()
  const { goToFirstCity } = useGo()

  const { create, estimate } = useMovement()
  const [ selectedTroups, setSelectedTroups ] = useState<Partial<Record<TroupCode, number>>>({})
  const [ destination, setDestination ] = useState<Coordinates>({ x: 1, y: 1, sector: 1 })
  const [ estimation, setEstimation ] = useState<MovementEstimation>({ speed: 0, duration: 0, distance: 0 })
  const [ action, setAction ] = useState<MovementAction>(MovementAction.BASE)

  useEffect(() => {
    launchMovementEstimation()
  }, [selectedTroups, destination])

  const launchMovementEstimation = async () => {
    const origin = city ? city.coordinates : outpost?.coordinates
    if (!origin) {
      return
    }

    const troupCodes: TroupCode[] = Object.keys(selectedTroups).filter(code => selectedTroups[code as TroupCode]).map(code => code as TroupCode)

    if (!troupCodes.length) {
      return
    }

    const result = await estimate({ origin, destination, troupCodes })
    if (!result) {
      setEstimation({
        speed: 0,
        duration: 0,
        distance: 0
      })
      return
    }

    setEstimation(result)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const origin = city ? city.coordinates : outpost?.coordinates
    if (!origin) {
      return
    }

    const moveTroups = Object.keys(selectedTroups).reduce((acc, key) => {
      const code = key as TroupCode
      if (selectedTroups[code]) {
        return [...acc, {code, count: selectedTroups[code] ?? 0}]
      }

      return acc
    }, new Array<{ code: TroupCode, count: number }>())

    if (!moveTroups.length) {
      return
    }

    const { deletedOutpostId } = await create({ action, origin, destination, troups: moveTroups })
    if (deletedOutpostId && outpost?.id === deletedOutpostId) {
      toast.info('L\'avant poste temporaire a été supprimé, retour à la ville')
      goToFirstCity()
    }
  }

  return <form id="movement-creation" onSubmit={(event) => onSubmit(event)}>
    <div id="troup-selection">
      <h2>Troupes à envoyer</h2>
      <MovementCreateTroups
        troups={troups}
        selectedTroups={selectedTroups}
        onChange={setSelectedTroups}
      />
    </div>
    <div id="movement-submit">
      <h2>Déplacement</h2>
      <MovementCreateAction
        action={action}
        onChange={setAction}
      />
      <MovementCreateDestination
        destination={destination}
        onChange={setDestination}
      />
      <MovementCreateEstimation estimation={estimation}/>

      <MovementCreateWarning
        isTemporaryOutpost={Boolean(outpost?.type === OutpostType.TEMPORARY)}
        troups={troups}
        selectedTroups={selectedTroups}
      /><br />
      <input disabled={!estimation.distance} type="submit" value="Envoyer" />
    </div>
  </form>
}
