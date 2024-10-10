import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface User {
  id: string
  name: string
  email: string
}

interface EditUserProps {
  user: User
  onUpdate: (updatedUser: User) => void
}

export default function EditUser({ user, onUpdate }: EditUserProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const { user: auth0User } = useAuth0()

  useEffect(() => {
    setName(auth0User?.name ?? '')
    setEmail(auth0User?.email ?? '')
  }, [auth0User])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updatedUser: User = {
        id: user.id,
        name,
        email,
      }
      await onUpdate(updatedUser)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update User</button>
    </form>
  )
}
