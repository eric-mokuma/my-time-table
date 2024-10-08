import db from '../db/connection'
import { Task } from '../../models/modelTask'

// Function to get all tasks from the database
export async function getTasks(): Promise<Task[]> {
  return db('tasks').select(
    'id',
    'TaskName',
    'description',
    'duration',
    'is_priority',
    'is_completed',
  )
}

// Function to update a task by ID
export async function updateTaskById(updatedTask: Partial<Task>, id: number) {
  const result = await db('tasks').where({ TaskId: id }).update(updatedTask)
  return result
}

// Function to get a task by ID
export async function getTaskById(id: number): Promise<Task | undefined> {
  const result = await db('tasks')
    .where({ TaskId: id })
    .select(
      'id',
      'TaskName',
      'description',
      'duration',
      'is_priority',
      'is_completed',
    )
    .first()
  return result
}

// Function to add a new task to the database
export async function addTask(newTask: Task): Promise<number> {
  const result = await db('tasks').insert({
    task_name: newTask.task_name,
    description: newTask.description,
    duration: newTask.duration,
    is_priority: newTask.is_priority,
    is_completed: newTask.is_completed,
  })
  return result[0] // Assuming TaskId is auto-generated
}

// Function to delete a task by ID
export async function deleteTaskById(id: number) {
  const result = await db('tasks').where({ id }).delete()
  return result
}
