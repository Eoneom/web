import { useAuth } from '#auth/hook'
import { getOutpost } from '#outpost/api/get'
import { listOutposts } from '#outpost/api/list'
import { OutpostContext } from '#outpost/hook/context'
import { Outpost, OutpostItem } from '#types'
import { useContext } from 'react'

export interface HookUseOutpost {
  outpost: Outpost | null
  outposts: OutpostItem[]
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

  const { token } = useAuth()

  const select = async ({ outpostId }: { outpostId: string; }) => {
    const outpost = await getOutpost({ token, outpostId })
    if (!outpost) {
      return
    }

    setOutpost(outpost)
  }

  const list = async () => {
    const data = await listOutposts({ token })
    if (!data) {
      return
    }

    setOutposts(data.outposts)
  }

  return {
    outpost,
    outposts,
    select,
    list,
  }
}
