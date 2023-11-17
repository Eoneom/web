import { useContext } from 'react'
import { OutpostItem } from '#types'
import { useAuth } from '#auth/hook'
import { OutpostContext } from './context'
import { listOutposts } from '../api/list'

interface HookUseOutpost {
  outposts: OutpostItem[]
  list: () => Promise<void>
}

export const useOutpost = (): HookUseOutpost => {
  const {
    outposts,
    setOutposts
  } = useContext(OutpostContext)

  const { token } = useAuth()

  const list = async () => {
    const data = await listOutposts({ token })
    if (!data) {
      return
    }

    setOutposts(data.outposts)
  }

  return {
    outposts,
    list,
  }
}
