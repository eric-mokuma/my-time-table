import request from 'superagent'
import { Task } from '../../models/modelTask'

const rootUrl = '/api/v1'

export async function getTasks(): Promise<Task[]> {
  const response = await request.get(`${rootUrl}/tasks`)
  return response.body as Task[]
}

export async function getTask(id: number): Promise<Task> {
  const response = await request.get(`${rootUrl}/tasks/${id}`)
  return response.body as Task
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const response = await request.post(`${rootUrl}/tasks`).send(task)
  return response.body as Task
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await request.patch(`${rootUrl}/tasks/${task.id}`).send(task)
  return response.body as Task
}

export async function deleteTask(id: number): Promise<void> {
  await request.delete(`${rootUrl}/tasks/${id}`)
}
