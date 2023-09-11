import { useTroup } from '#troup/hook'
import { Button } from '#ui/button'
import React, { useState } from 'react'

export const TroupDetailsRecruit: React.FC = () => {
  const [count, setCount] = useState(0)
  const { inProgress, recruit, selectedTroup } = useTroup()
  if (inProgress || !selectedTroup) {
    return null
  }

  return <>
    <input type="number" onChange={event => setCount(Number.parseInt(event.target.value))}/>
    <Button onClick={() => recruit({ code: selectedTroup.code, count })}>Recruter</Button>
  </>
}
