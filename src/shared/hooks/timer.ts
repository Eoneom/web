import { useEffect, useState } from 'react'
import { getRemaingTime } from '../../helpers/transform'

interface HookTimer {
  remainingTime: number
  reset: () => void
}

export const useTimer = ({ doneAt, onDone }: { doneAt?: number, onDone: () => void }): HookTimer => {
  const [remainingTime, setRemainingTime] = useState(getRemaingTime(doneAt))
  const reset = () => {
    setRemainingTime(0)
  }

  useEffect(() => {
    if (!doneAt) {
      return
    }
    setRemainingTime(getRemaingTime(doneAt))

    const interval = setInterval(() => {
      const time = getRemaingTime(doneAt)
      if (time <= 0) {
        setRemainingTime(0)
        clearInterval(interval)
        onDone()
        return
      }

      setRemainingTime(time)
    }, 1000)

    return () => clearInterval(interval)
  }, [doneAt])

  return {
    remainingTime,
    reset
  }
}
