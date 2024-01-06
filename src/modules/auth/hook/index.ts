import { useContext } from 'react'

import { AuthContext } from '#auth/hook/context'
import { login as doLogin } from '#auth/api/login'
import { logout as doLogout } from '#auth/api/logout'
import { doSignup } from '#auth/api/signup'
import { toast } from 'react-toastify'

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
    let token
    try {
      token = await doLogin({ playerName })
    } catch (err) {
      await doSignup({ playerName, cityName: `${playerName}City` })
      token = await doLogin({ playerName })
    }

    if (!token) {
      toast.error('error occured during login/signup')
      return
    }
    window.localStorage.setItem('token', token)
    setToken(token)
  }

  const logout = async () => {
    await doLogout({ token })
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
