import request from 'superagent'
import { User } from '../../models/modelUsers'

const rootUrl = '/api/v1'

export async function getUsers(token: string): Promise<User[]> {
  try {
    const res = await request
      .get(`${rootUrl}/users`)
      .set('Authorization', `Bearer ${token}`)
    return res.body
  } catch (error) {
    console.error('Failed to get users:', error)
    throw error
  }
}

export async function getUserById(id: number, token: string): Promise<User> {
  try {
    const res = await request
      .get(`${rootUrl}/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
    return res.body
  } catch (error) {
    console.error(`Failed to get user with id ${id}:`, error)
    throw error
  }
}

export async function addUser(newUser: User, token: string): Promise<User> {
  try {
    const res = await request
      .post(`${rootUrl}/users`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
    return res.body
  } catch (error) {
    console.error('Failed to add user:', error)
    throw error
  }
}

export async function updateUser(
  updatedUser: User,
  token: string,
): Promise<void> {
  try {
    await request
      .patch(`${rootUrl}/users/${updatedUser.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
  } catch (error) {
    console.error(`Failed to update user with id ${updatedUser.id}:`, error)
    throw error
  }
}

export async function deleteUser(id: number, token: string): Promise<void> {
  try {
    await request
      .delete(`${rootUrl}/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
  } catch (error) {
    console.error(`Failed to delete user with id ${id}:`, error)
    throw error
  }
}
