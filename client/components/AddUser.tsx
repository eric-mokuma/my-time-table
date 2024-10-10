import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/modelUsers'
import { useUsers } from '../hooks/useUsers'

interface Props {
  onClose: () => void
}

type FormState = Omit<User, 'id' | 'created_at'>

export default function AddUser({ onClose }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const { addUser } = useUsers()

  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
  })

  const [changed, setChanged] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!changed) {
      return setChanged(true)
    }

    try {
      await getAccessTokenSilently()
      await addUser.mutateAsync({
        ...form,
        id: 0,
        created_at: new Date().toISOString(),
      })
      onClose()
    } catch (error) {
      console.error('Failed to add user:', error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  return (
    <>
      {changed && (
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <p>Are you sure you want to add this user?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button type="button" onClick={() => handleSubmit}>
                  Add User
                </button>
                <button type="button" onClick={() => setChanged(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add User</button>
        </div>
      </form>
    </>
  )
}
