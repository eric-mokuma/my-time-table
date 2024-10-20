import { useState } from 'react';
import { useTask } from '../hooks/useTask';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import DeleteTask from '../components/DeleteTask';
import { Task } from '../../models/modelTask';

export default function MainPage() {
  const { tasks, loading: tasksLoading, error: tasksError, removeTask } = useTask();

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<number | null>(null);

  if (tasksLoading) return <p>Loading...</p>;
  if (tasksError) return <p>Error loading tasks</p>;

  return (
    <div>
      <h1>Task Management</h1>
      <section>
        <h2>Tasks</h2>
        <button onClick={() => setIsAddingTask(true)}>Add New Task</button>
        {isAddingTask && <AddTask onClose={() => setIsAddingTask(false)} />}
        <ul>
          {tasks.map((task: Task) => (
            <li key={task.id}>
              <h3>{task.task_name}</h3>
              <p>{task.description}</p>
              <p>Duration: {task.duration}</p>
              <p>Priority: {task.is_priority ? 'Yes' : 'No'}</p>
              <p>Completed: {task.is_completed ? 'Yes' : 'No'}</p>
              <button onClick={() => setEditingTask(task.id)}>Edit</button>
              {/* Ensure DeleteTask component accepts task and onDelete props */}
              <DeleteTask task={task} onDelete={() => removeTask(task.id)} />
              {editingTask === task.id && (
                <EditTask task={task} onClose={() => setEditingTask(null)} />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
