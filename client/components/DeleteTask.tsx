import { useTask } from '../hooks/useTask'
import { useAuth0 } from '@auth0/auth0-react'

interface DeleteTaskProps {
  task: {
    id: number
  }
  onDelete?: () => void
}

export default function DeleteTask({ task, onDelete }: DeleteTaskProps) {
  const { removeTask } = useTask()
  const { getAccessTokenSilently } = useAuth0()
  const handleDelete = async () => {
    await getAccessTokenSilently()
    await removeTask(task.id)
    if (onDelete) {
      onDelete()
    }
  }

  return (
    <button onClick={handleDelete} className="delete-task-btn">
      Delete Task
    </button>
  )
}
