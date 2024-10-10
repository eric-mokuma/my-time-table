import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { User } from '../../models/modelUsers'

interface Props {
  user: User
  onClose: () => void
}

export default function DeleteUser({ user, onClose }: Props) {
  const { delete: deleteUser } = useUsers()
  const [isConfirming, setIsConfirming] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteUser.mutateAsync(user.id)
      onClose()
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  return (
    <div>
      {!isConfirming ? (
        <button onClick={() => setIsConfirming(true)}>Delete User</button>
      ) : (
        <div>
          <div>
            <div>
              <h3>Delete User</h3>
              <div>
                <p>
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </p>
              </div>
              <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setIsConfirming(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
