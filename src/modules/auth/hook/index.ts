import { useContext, useEffect } from 'react'
import { AuthContext } from './context'
import { login as doLogin } from '../../../api/player/login'

interface HookUseAuth {
  token: string
  login: (props: LoginProps) => Promise<void>
  logout: () => Promise<void>
}

interface LoginProps {
  playerName: string
}

export const useAuth = (): HookUseAuth => {
  const { token, setToken } = useContext(AuthContext)

  useEffect(() => {
    const stored_token = window.localStorage.getItem('token')
    if (stored_token) {
      setToken(stored_token)
    }
  }, [])

  const login = async ({ playerName }: LoginProps) => {
    const token = await doLogin({ playerName })
    window.localStorage.setItem('token', token)
    setToken(token)
  }

  const logout = async () => {
    window.localStorage.removeItem('token')
    setToken('')
  }

  return {
    token,
    login,
    logout
  }
}
