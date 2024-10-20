import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../../models/modelTask'; 

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/v1/tasks'); // Use the proxy path
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`/api/v1/tasks/${id}`, { // Use the proxy path
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        setTasks(tasks.filter(task => task.id !== id)); // Update the state to remove the deleted task
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while deleting the task');
        }
      }
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/tasks/add">Add New Task</Link>
      {tasks.length === 0 ? ( // Check if there are no tasks
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <h3>{task.task_name}</h3>
              <p>{task.description}</p>
              <p>Duration: {task.duration}</p>
              <p>Priority: {task.is_priority ? 'Yes' : 'No'}</p>
              <p>Completed: {task.is_completed ? 'Yes' : 'No'}</p>
              <Link to={`/tasks/edit/${task.id}`}>Edit</Link>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
