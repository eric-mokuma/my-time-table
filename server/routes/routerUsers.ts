import express from 'express'
import * as db from '../db/dbUsers'
import { User } from '../../models/modelUsers'

const router = express.Router()

// GET /api/v1/users for getting all users
router.get('/', async (req, res) => {
  try {
    const users = await db.getUsers()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// PATCH /api/v1/users/:id for updating a user by id
router.patch('/:id', async (req, res) => {
  try {
    const { username, email } = req.body
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    const updatedUser: User = { id, username, email, createdAt: new Date() }
    await db.updateUserById(updatedUser, id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// DELETE /api/v1/users/:id for deleting a user by id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    await db.deleteUserById(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// POST /api/v1/users to add a new user
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body
    const createdAt = new Date()
    const newUser: User = { id: 0, username, email, createdAt }
    const id = await db.addUser(newUser)
    res.status(201).json({ id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

export default router
