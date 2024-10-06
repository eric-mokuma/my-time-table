import { Leaderboard } from '@models/leaderboard'
import db from '../seeds/connection'
import { User } from '../../../models/userModels'

export async function getUserById(id: number): Promise<User | undefined> {
  return db('users')
    .where({ id })
    .select('id', 'username', 'email', 'created_at as createdAt')
    .first()
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return db('users')
    .where({ email })
    .select('id', 'username', 'email', 'created_at as createdAt')
    .first()
}

export async function createUser(
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User> {
  const [createdUser] = await db('users')
    .insert(user)
    .returning(['id', 'username', 'email', 'created_at as createdAt'])
  return createdUser
}

export async function updateUser(
  id: number,
  updateData: Partial<User>
): Promise<User | undefined> {
  const [updatedUser] = await db('users')
    .where({ id })
    .update(updateData)
    .returning(['id', 'username', 'email', 'created_at as createdAt'])
  return updatedUser
}

export async function deleteUser(id: number): Promise<boolean> {
  const deletedCount = await db('users').where({ id }).del()
  return deletedCount > 0
}
