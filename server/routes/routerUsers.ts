import express from 'express'
import * as db from '../db/dbUsers'
import { User } from '../../models/modelUsers'
import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()

// GET /api/v1/users for getting all users
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const users = await db.getUsers()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET /api/v1/users get an user by id
router.get('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = Number(req.params.id)
    const user = await db.getUserById(id)
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// PATCH /api/v1/users/:id for updating a user by id
router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { username, email } = req.body
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    const updatedUser: User = { id, username, email, created_at: new Date() }
    await db.updateUserById(updatedUser, id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

// DELETE /api/v1/users/:id for deleting a user by id
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    await db.deleteUserById(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

// POST /api/v1/users to add a new user
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { username, email } = req.body
    const newUser: User = { id: 0, username, email, created_at: new Date() }
    const id = await db.addUser(newUser)
    res.status(201).json({ id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to add user' })
  }
})

export default router
