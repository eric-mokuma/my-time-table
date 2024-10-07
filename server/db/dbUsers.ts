import db from '../db/connection'

import { User } from '../../models/modelUsers'

// here is a simple function to get all users from the database
export async function getUsers(): Promise<User[]> {
  return db('users').select('id', 'username', 'email', 'createdAt')
}
// here is a simple function to update a user by id
export async function updateUserById(updatedUser: Partial<User>, id: number) {
  const result = await db('users').where({ id }).update(updatedUser)
  return result
}
// here is a simple function to get a user by id
export async function getUserById(id: number) {
  const result = await db('users')
    .where({ id })
    .select('id', 'username', 'email', 'createdAt')
    .first()
  return result
}
// here is a simple function to add a new user to the database
export async function addUser(newUser: User) {
  const result = await db('users').insert({
    username: newUser.username,
    email: newUser.email,
    createdAt: newUser.createdAt,
  })
  return result[0]
}
// here is a simple function to delete a user by id
export async function deleteUserById(id: number) {
  const result = await db('users').where({ id }).delete()
  return result
}