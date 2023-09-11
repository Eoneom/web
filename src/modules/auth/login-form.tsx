import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useAuth } from '#auth/hook'

export const AuthLoginForm: React.FC = () => {
  const [playerName, setPlayerName] = useState('')
  const { login, token } = useAuth()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (!playerName) {
      toast.error('Le nom est requis pour se connecter')
      return
    }

    login({ playerName })
  }

  if (token) {
    return null
  }

  return <form onSubmit={onSubmit}>
    <input type="text" placeholder="Nom" onChange={event => setPlayerName(event.target.value)} />
    <input type="submit" value="Se connecter" />
  </form>
}
