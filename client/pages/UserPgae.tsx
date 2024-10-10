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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Users</h1>

      <button
        onClick={() => setIsAddingUser(true)}
        className="bg-blue-500 hover:bg-blue-700 mb-4 rounded px-4 py-2 font-bold text-white"
      >
        Add User
      </button>

      {isAddingUser && <AddUser onClose={() => setIsAddingUser(false)} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div key={user.id} className="rounded-lg border p-4 shadow">
            <h2 className="mb-2 text-xl font-semibold">{user.username}</h2>
            <p className="mb-4 text-gray-600">{user.email}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingUser(user)}
                className="bg-yellow-500 hover:bg-yellow-600 rounded px-3 py-1 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => setDeletingUser(user)}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                Delete
              </button>
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
