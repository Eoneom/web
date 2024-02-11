import { selectToken } from '#auth/slice'
import { getOutpost } from '#outpost/api/get'
import { listOutposts } from '#outpost/api/list'
import { OutpostContext } from '#outpost/hook/context'
import { useAppSelector } from '#store/type'
import { Outpost, OutpostItem } from '#types'
import { useContext } from 'react'

export interface HookUseOutpost {
  outpost: Outpost | null
  outposts: OutpostItem[]
  deselect: () => void
  select: (params: { outpostId: string }) => Promise<void>
  list: () => Promise<void>
}

export const useOutpost = (): HookUseOutpost => {
  const {
    outposts,
    setOutposts,
    outpost,
    setOutpost
  } = useContext(OutpostContext)

  const token = useAppSelector(selectToken)

  const select = async ({ outpostId }: { outpostId: string; }) => {
    if (!token) {
      return
    }

    const outpost = await getOutpost({ token, outpostId })
    if (!outpost) {
      return
    }

    setOutpost(outpost)
  }

  const deselect = () => {
    setOutpost(null)
  }

  const list = async () => {
    if (!token) {
      return
    }

    const data = await listOutposts({ token })
    if (!data) {
      return
    }

    setOutposts(data.outposts)
  }

  return {
    outpost,
    outposts,
    deselect,
    select,
    list,
  }
}
