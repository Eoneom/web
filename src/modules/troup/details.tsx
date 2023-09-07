import React, { useState } from 'react'
import { Troup } from '#shared/types'
import { Details } from '#shared/ui/details'
import { TroupTranslations } from '#troup/translations'
import { useTroup } from '#troup/hook'
import { Button } from '#shared/ui/button'

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
