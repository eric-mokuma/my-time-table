import db from '../db/connection'

import { User } from '../../models/modelUsers'

// get all users from the database
export async function getUsers(): Promise<User[]> {
  return db('users').select()
}
// update a user by id
export async function updateUserById(updatedUser: Partial<User>, id: number) {
  const result = await db('users').where({ id }).update(updatedUser)
  return result
}
// get a user by id
export async function getUserById(id: number) {
  const result = await db('users')
    .where({ id })
    .select('id', 'username', 'email', 'created_at')
    .first()
  return result
}
// add a new user to the database
export async function addUser(newUser: User): Promise<number> {
  const result = await db('users').insert({
    username: newUser.username,
    email: newUser.email,
    created_at: newUser.createdAt,
  })
  return result[0]
}

// delete a user by id
export async function deleteUserById(id: number) {
  const result = await db('users').where({ id }).delete()
  return result
}
