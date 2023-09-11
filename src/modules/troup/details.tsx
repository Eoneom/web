import React, { useState } from 'react'
import { Troup } from '#types'
import { Details } from '#ui/details'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { Button } from '#ui/button'

interface Props {
  troup: Troup
}

export const TroupDetails: React.FC<Props> = ({ troup }) => {
  const { name } = TroupTranslations[troup.code]
  const [count, setCount] = useState(0)
  const { recruit, inProgress } = useTroup()
  const details = <>
    <h2>{name}</h2>
    {!inProgress && <>
      <input type="number" onChange={event => setCount(Number.parseInt(event.target.value))}/>
      <Button onClick={() => recruit({ code: troup.code, count })}>Recruter</Button>
    </>}
  </>

  return <Details
    itemDetails={details}
    requirements={troup.requirement}
    cost={troup.cost}
  />
}
