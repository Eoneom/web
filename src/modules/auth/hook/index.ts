import { useContext } from 'react'

import { AuthContext } from '#auth/hook/context'
import { login as doLogin } from '#auth/api/login'

interface HookUseAuth {
  token: string
  retrieveStoredToken: () => void
  login: (props: LoginProps) => Promise<void>
  logout: () => Promise<void>
}

interface LoginProps {
  playerName: string
}

export const useAuth = (): HookUseAuth => {
  const { token, setToken } = useContext(AuthContext)

  const retrieveStoredToken = () => {
    const stored_token = window.localStorage.getItem('token')
    if (stored_token) {
      setToken(stored_token)
    }
  }

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
    logout,
    retrieveStoredToken
  }
}
