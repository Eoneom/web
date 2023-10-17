import React from 'react'
import { formatTime } from '#helpers/transform'
import { useTroup } from '#troup/hook'
import { TroupTranslations } from '#troup/translations'
import { Button } from '#ui/button'
import { useTimer } from '#hook/timer'

export const TroupListInProgress: React.FC = () => {
  const { inProgress, cancel, progressRecruit } = useTroup()

  const { remainingTime, reset } = useTimer({
    doneAt: inProgress?.ongoing_recruitment?.finish_at,
    onDone: progressRecruit,
    onTick: progressRecruit,
    tickDuration: inProgress?.cost.duration
  })

  if (!inProgress) {
    return null
  }

  const handleCancel = () => {
    cancel()
    reset()
  }

  return <>
    <p>En cours: {TroupTranslations[inProgress.code].name} {formatTime(remainingTime)}</p>
    <Button onClick={handleCancel}>Annuler</Button>
  </>
}
