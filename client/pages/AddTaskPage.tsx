import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../models/modelTask';

export default function AddTaskPage () {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [isPriority, setIsPriority] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new task object based on the Task interface
    const newTask: Task = {
      id: Date.now(), 
      task_name: taskName,
      description,
      duration,
      is_priority: isPriority,
      is_completed: isCompleted,
    };

    console.log('New Task:', newTask);

    // Reset form fields
    setTaskName('');
    setDescription('');
    setDuration('');
    setIsPriority(false);
    setIsCompleted(false);

    // Navigate back to the task list or another page
    navigate('/tasks');
  };

  return (
    <div>
      <h1>Add New Task</h1>
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
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};



