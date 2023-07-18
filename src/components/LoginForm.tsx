import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { login } from '../api/player/login'

interface Props {
  onLogin: ({ token }: { token: string }) => void
}

export const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [playerName, setPlayerName] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (!playerName) {
      toast.error('Le nom est requis pour se connecter')
      return
    }

    try {
      const token = await login({ player_name: playerName })
      onLogin({ token })
    } catch (err) {
      toast.error(`${err}`)
    }
  }

  return <form onSubmit={onSubmit}>
    <input type="text" placeholder="Nom" onChange={event => setPlayerName(event.target.value)} />
    <input type="submit" value="Se connecter" />
  </form>
}
