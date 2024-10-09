import db from '../db/connection'
import { User } from '../../models/modelUsers'

// Get all users from the database
export async function getUsers(): Promise<User[]> {
  return db('users').select()
}

// Update a user by id
export async function updateUserById(updatedUser: Partial<User>, id: number) {
  return db('users').where({ id }).update(updatedUser)
}

// Get a user by id
export async function getUserById(id: number) {
  return db('users')
    .where({ id })
    .select('id', 'username', 'email', 'created_at')
    .first()
}

// Add a new user to the database
export async function addUser(newUser: User) {
  const result = await db('users').insert({
    username: newUser.username,
    email: newUser.email,
    createdAt: newUser.created_at,
  })
  return result[0]
}

// Delete a user by id
export async function deleteUserById(id: number) {
  return db('users').where({ id }).delete()
}
