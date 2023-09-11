import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTroup } from '#troup/hook'
import { TroupTranslations } from '#troup/translations'
import { Button } from '#ui/button'

export const TroupListInProgress: React.FC = () => {
  const { inProgress, cancel } = useTroup()
  if (!inProgress) {
    return null
  }
  return <>
    <p>En cours: {TroupTranslations[inProgress.code].name} {formatTime(inProgress.remainingTime)}</p>
    <Button onClick={() => cancel()}>Annuler</Button>
  </>
}
