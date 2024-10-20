import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTask } from '../hooks/useTask'
import { Task } from '../../models/modelTask'

interface EditTaskProps {
  task: Task; // Ensure task prop is defined
  onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onClose }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { tasks, loading, error, editTask } = useTask()
  const [formData, setFormData] = useState<Task>(task) // Use task prop for initial state

  useEffect(() => {
    const task = tasks.find((t) => t.id === Number(id))
    if (task) setFormData(task)
  }, [tasks, id])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData) {
      await editTask(formData)
      onClose() // Call onClose after editing the task
      navigate('/tasks')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!formData) return <div>Task not found</div>

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  )
}

export default EditTask
