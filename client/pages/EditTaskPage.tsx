import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../../models/modelTask'; 

export default function EditTaskPage () {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  // State to hold task details
  const [task, setTask] = useState<Task | null>(null);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [isPriority, setIsPriority] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Fetch the task details from your backend using the task ID
    const fetchTask = async () => {
      // Replace with your actual API call
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
      setTaskName(data.task_name);
      setDescription(data.description);
      setDuration(data.duration);
      setIsPriority(data.is_priority);
      setIsCompleted(data.is_completed);
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the updated task object
    const updatedTask: Task = {
      id: Number(id), // Ensure the ID is a number
      task_name: taskName,
      description,
      duration,
      is_priority: isPriority,
      is_completed: isCompleted,
    };

    // Send the updated task to your backend
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    // Navigate back to the task list or another page
    navigate('/tasks');
  };

  if (!task) {
    return <p>Loading...</p>; // Show loading state while fetching task
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="isPriority">Is Priority:</label>
          <input
            type="checkbox"
            id="isPriority"
            checked={isPriority}
            onChange={(e) => setIsPriority(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="isCompleted">Is Completed:</label>
          <input
            type="checkbox"
            id="isCompleted"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};



