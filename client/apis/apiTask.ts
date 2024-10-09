import request from 'superagent'
import { Task } from '../../models/modelTask'

const rootUrl = '/api/v1'

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await request.get(`${rootUrl}/tasks`)
    return response.body as Task[]
  } catch (error) {
    console.error('Failed to get tasks:', error)
    throw error
  }
}

export async function getTask(id: number): Promise<Task> {
  try {
    const response = await request.get(`${rootUrl}/tasks/${id}`)
    return response.body as Task
  } catch (error) {
    console.error(`Failed to get task with id ${id}:`, error)
    throw error
  }
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  try {
    const response = await request.post(`${rootUrl}/tasks`).send(task)
    return response.body as Task
  } catch (error) {
    console.error('Failed to create task:', error)
    throw error
  }
}

export async function updateTask(task: Task): Promise<Task> {
  try {
    const response = await request
      .patch(`${rootUrl}/tasks/${task.id}`)
      .send(task)
    return response.body as Task
  } catch (error) {
    console.error(`Failed to update task with id ${task.id}:`, error)
    throw error
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    await request.delete(`${rootUrl}/tasks/${id}`)
  } catch (error) {
    console.error(`Failed to delete task with id ${id}:`, error)
    throw error
  }
}
