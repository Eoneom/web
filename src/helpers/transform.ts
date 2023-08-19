export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const secondsWithoutHours = seconds % 3600
  const minutes = Math.floor(secondsWithoutHours / 60)
  const remainingSeconds = secondsWithoutHours % 60

  if (hours) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`
  }

  if (minutes) {
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${remainingSeconds}s`
}

export const getRemaingTime = (date?: number): number => {
  if (!date) {
    return 0
  }

  const remainingTime = (date ?? 0) - (new Date().getTime())
  return Math.ceil(remainingTime/1000)
}

export const transformDecimals = (value?: number): string => {
  if (!value) {
    return ''
  }

  const steps = [
    { threshold: 1000000000, unit: 'T' },
    { threshold: 1000000, unit: 'M' },
    { threshold: 1000, unit: 'k' }
  ]

  for(const step of steps) {
    if (value > step.threshold) {
      return `${floorValue(value / step.threshold)}${step.unit}`
    }
  }

  return `${value}`
}

const floorValue = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals)
  return Math.floor(value*factor)/factor
}
