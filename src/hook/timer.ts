import { useEffect, useState } from 'react'
import { getRemaingTime } from '#helpers/transform'

interface HookTimerProps {
  doneAt?: number
  onDone: () => void
  onTick?: () => void
  tickDuration?: number
}

interface HookTimer {
  remainingTime: number
  reset: () => void
}

export const useTimer = ({ doneAt, onDone, onTick, tickDuration }: HookTimerProps): HookTimer => {
  const [remainingTime, setRemainingTime] = useState(getRemaingTime(doneAt))
  const [lastTick, setLastTick] = useState(getRemaingTime(doneAt))
  const reset = () => {
    setRemainingTime(0)
    setLastTick(0)
  }

  useEffect(() => {
    if (!doneAt) {
      return
    }

    setRemainingTime(getRemaingTime(doneAt))
    setLastTick(getRemaingTime(doneAt))

    const interval = setInterval(() => {
      const time = getRemaingTime(doneAt)
      if (time <= 0) {
        setRemainingTime(0)
        setLastTick(0)
        clearInterval(interval)
        onDone()
        return
      }

      const isTickElapsed = Math.abs(lastTick - time) > (tickDuration ?? 1)
      if (onTick && isTickElapsed) {
        setLastTick(time)
        onTick()
      }

      setRemainingTime(time)
    }, 1000)

    return () => clearInterval(interval)
  }, [doneAt, lastTick])

  return {
    remainingTime,
    reset
  }
}
