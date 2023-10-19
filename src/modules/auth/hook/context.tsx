/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react'

interface AuthContextState {
  token: string
  setToken: (token: string) => void
}

export const AuthContext = createContext<AuthContextState>({
  token: '',
  setToken: () => {}
})

interface Props {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [ token, setToken ] = useState('')
  return (
    <AuthContext.Provider value={{
      token,
      setToken: (token: string) => setToken(token)
    }}>
      {children}
    </AuthContext.Provider>
  )
}
