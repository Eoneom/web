export const displayRemainingTime = (remainingTime?: number) => {
  if (!remainingTime) {
    return
  }

  return `construit dans ${Math.ceil(remainingTime / 1000)}s`
}

export const getRemaingTime = (date?: number): number => {
  if (!date) {
    return 0
  }

  return (date ?? 0) - (new Date().getTime())
}

export const transformDecimals = (value?: number): string => {
  if (!value) {
    return ''
  }
  const steps = [
    { threshold: 1000000, unit: 'M' },
    { threshold: 1000, unit: 'k' }
  ]

  for(const step of steps) {
    if (value > step.threshold) {
      return `${roundValue(value / step.threshold)}${step.unit}`
    }
  }

  return `${value}`
}

const roundValue = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(value*factor)/factor
}
