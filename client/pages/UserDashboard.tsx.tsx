import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { User } from '../../models/modelUsers'
import AddUser from '../components/AddUser'
import EditUser from '../components/EditUser'
import DeleteUser from '../components/DeleteUser'

export default function UserPage() {
  const { data: users, isLoading, isError, error } = useUsers()
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  if (isLoading) return <div>Loading users...</div>
  if (isError) return <div>Error: {error?.message}</div>

  return (
    <div>
      <h1>Users</h1>

      <button onClick={() => setIsAddingUser(true)}>Add User</button>

      {isAddingUser && <AddUser onClose={() => setIsAddingUser(false)} />}

      <div>
        {users?.map((user) => (
          <div key={user.id}>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <div>
              <button onClick={() => setEditingUser(user)}>Edit</button>
              <button onClick={() => setDeletingUser(user)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingUser && (
        <EditUser
          user={{
            ...editingUser,
            id: editingUser.id.toString(),
            name: editingUser.username,
          }}
          onUpdate={(updatedUser) => {
            console.log('User updated:', updatedUser)
            setEditingUser(null)
          }}
        />
      )}

      {deletingUser && (
        <DeleteUser user={deletingUser} onClose={() => setDeletingUser(null)} />
      )}
    </div>
  )
}
