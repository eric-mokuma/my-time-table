import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useTask } from '../hooks/useTask'
import { useUsers } from '../hooks/useUsers'
import AddTask from '../components/AddTask'
import EditTask from '../components/EditTask'
import DeleteTask from '../components/DeleteTask'
import AddUser from '../components/AddUser'
import EditUser from '../components/EditUser'
import DeleteUser from '../components/DeleteUser'

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
    update: updateUser,
    delete: deleteUser,
  } = useUsers()

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [editingUser, setEditingUser] = useState<number | null>(null)

  if (tasksLoading || usersLoading) return <p>Loading...</p>
  if (tasksError) return <p>Error loading tasks: {tasksError}</p>
  if (usersError) return <p>Error loading users: {usersError?.message}</p>

  return (
    <div className="container">
      {isAuthenticated ? (
        <div className="mb-4 p-6">
          <h1 className="heading-1-caveat mb-4">Welcome, {user?.name}!</h1>

          <section className="mb-8">
            <h2 className="heading-2 mb-4">Tasks</h2>
            <button
              className="primary_button mb-4"
              onClick={() => setIsAddingTask(true)}
            >
              Add New Task
            </button>
            {isAddingTask && <AddTask onClose={() => setIsAddingTask(false)} />}
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="mb-4">
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
            <h2 className="heading-2 mb-4">Users</h2>
            <button
              className="primary_button mb-4"
              onClick={() => setIsAddingUser(true)}
            >
              Add New User
            </button>
            {isAddingUser && <AddUser onClose={() => setIsAddingUser(false)} />}
            <ul>
              {users?.map((user) => (
                <li key={user.id} className="mb-4">
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                  <button onClick={() => setEditingUser(user.id)}>Edit</button>
                  <DeleteUser
                    user={user}
                    onClose={() => deleteUser.mutate(user.id)}
                  />
                  {editingUser === user.id && (
                    <EditUser
                      user={{
                        id: user.id.toString(),
                        name: user.username,
                        email: user.email,
                      }}
                      onUpdate={(updatedUser) =>
                        updateUser.mutate({
                          id: Number(updatedUser.id),
                          username: updatedUser.name,
                          email: updatedUser.email,
                        })
                      }
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <div className="mb-4 flex w-fit flex-col items-center justify-center space-x-4 p-6">
          <h1 className="heading-3-italic">
            Please sign in to access the main page.
          </h1>
        </div>
      )}
    </div>
  )
}
