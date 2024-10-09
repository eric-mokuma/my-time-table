import { useState, useEffect } from 'react'
import { Task } from '../../models/modelTask'
import { getTasks, createTask, updateTask, deleteTask } from '../apis/apiTask'

export function useTask() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (newTask: Omit<Task, 'id'>) => {
    setLoading(true)
    try {
      const createdTask = await createTask(newTask)
      setTasks([...tasks, createdTask])
      setError(null)
    } catch (err) {
      setError('Failed to add task')
    } finally {
      setLoading(false)
    }
  }

  const editTask = async (updatedTask: Task) => {
    setLoading(true)
    try {
      await updateTask(updatedTask)
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      )
      setError(null)
    } catch (err) {
      setError('Failed to update task')
    } finally {
      setLoading(false)
    }
  }

  const removeTask = async (taskId: number) => {
    setLoading(true)
    try {
      await deleteTask(taskId)
      setTasks(tasks.filter((task) => task.id !== taskId))
      setError(null)
    } catch (err) {
      setError('Failed to delete task')
    } finally {
      setLoading(false)
    }
  }

  return { tasks, loading, error, fetchTasks, addTask, editTask, removeTask }
}
