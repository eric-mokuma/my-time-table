import request from 'superagent'
import { logError } from './utils'
import { User } from '../../models/modelUsers'

const rootUrl = '/api/v1'

export async function getUsers(token: string): Promise<User[]> {
  return request
    .get(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}

export async function getUserById(id: number, token: string): Promise<User> {
  return request
    .get(`${rootUrl}/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}

export async function addUser(newUser: User, token: string): Promise<User> {
  return request
    .post(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body)
    .catch(logError)
}

export async function updateUser(
  updatedUser: User,
  token: string,
): Promise<void> {
  return request
    .patch(`${rootUrl}/users/${updatedUser.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(updatedUser)
    .then(() => {})
    .catch(logError)
}

export async function deleteUser(id: number, token: string): Promise<void> {
  return request
    .delete(`${rootUrl}/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then(() => {})
    .catch(logError)
}
