import React, { createContext, useState } from 'react'

interface AuthContextState {
  token: string
  setToken: (token: string) => void
}

export const AuthContext = createContext<AuthContextState>({
  token: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {}
})

interface ProviderProps {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<ProviderProps> = ({ children }) => {
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
