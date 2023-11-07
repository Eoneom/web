import { useTroup } from '#troup/hook'
import { Button } from '#ui/button'
import React from 'react'

interface Props {
  count: number
  onChange: (count: number) => void
  canRecruit: boolean
}

export const TroupDetailsRecruit: React.FC<Props> = ({ onChange, count, canRecruit }) => {
  const { inProgress, recruit, selectedTroup } = useTroup()
  if (inProgress || !selectedTroup) {
    return null
  }

  return (
    <>
      <input
        type="number"
        onChange={event => {
          const value = Number.parseInt(event.target.value)
          if (Number.isNaN(value) || value <= 0) {
            onChange(1)
            return
          }
          onChange(value)
        }}
        min={1}
      />

      <Button
        disabled={!canRecruit}
        onClick={() => {
          recruit({ code: selectedTroup.code, count })
          onChange(1)
        }}
      >
          Recruter
      </Button>
    </>
  )
}
