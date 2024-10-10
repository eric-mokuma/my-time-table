import React, { useState } from 'react'
import { useTask } from '../hooks/useTask'

interface Props {
  onClose: () => void
}

export default function AddTask({ onClose }: Props) {
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const { addTask } = useTask()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addTask({
        task_name: taskName,
        description,
        duration: '0',
        is_priority: false,
        is_completed: false,
      })
      onClose()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  )
}
