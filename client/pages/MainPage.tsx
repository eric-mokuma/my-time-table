import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useTask } from '../hooks/useTask'
import { useUsers } from '../hooks/useUsers'
import AddTask from '../components/AddTask'
import EditTask from '../components/EditTask'
import DeleteTask from '../components/DeleteTask'

export default function MainPage() {
  const { isAuthenticated, user } = useAuth0()
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    removeTask,
  } = useTask()
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
    updateUser,
    deleteUser,
  } = useUsers()

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTask, setEditingTask] = useState<number | null>(null)

  if (tasksLoading || usersLoading) return <p>Loading...</p>
  if (tasksError || usersError) return <p>Error loading data</p>

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user?.name}!</h1>

          <section>
            <h2>Tasks</h2>
            <button onClick={() => setIsAddingTask(true)}>Add New Task</button>
            {isAddingTask && <AddTask onClose={() => setIsAddingTask(false)} />}
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <h3>{task.task_name}</h3>
                  <p>{task.description}</p>
                  <button onClick={() => setEditingTask(task.id)}>Edit</button>
                  <DeleteTask
                    task={task}
                    onDelete={() => removeTask(task.id)}
                  />
                  {editingTask === task.id && <EditTask />}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Users</h2>
            <ul>
              {users?.map((user) => (
                <li key={user.id}>
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                  <button onClick={() => updateUser.mutate(user)}>Edit</button>
                  <button onClick={() => deleteUser.mutate(user.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <div>
          <h1>Please sign in to access the main page.</h1>
        </div>
      )}
    </div>
  )
}
