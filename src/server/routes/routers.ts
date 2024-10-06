import express from 'express'
import * as db from '../db/function/users'
import { User } from '../../models/userModels'

const router = express.Router()

// POST /api/v1/users
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body
    const newUser: Omit<User, 'id' | 'createdAt'> = { username, email }
    const createdUser = await db.createUser(newUser)
    res.status(201).json(createdUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// PATCH /api/v1/users/:id
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' })
      return
    }
    const { username, email } = req.body
    const updatedUser = await db.updateUserById(id, { username, email })
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// GET /api/v1/users/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' })
      return
    }
    const user = await db.getUserById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// DELETE /api/v1/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' })
      return
    }
    const deleted = await db.deleteUser(id)
    if (!deleted) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

export default router
