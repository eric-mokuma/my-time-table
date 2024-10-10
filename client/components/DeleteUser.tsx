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
        <button
          onClick={() => setIsConfirming(true)}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Delete User
        </button>
      ) : (
        <div
          className="fixed inset-0 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Delete User
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleDelete}
                  className="w-full rounded-md bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsConfirming(false)}
                  className="mt-3 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
