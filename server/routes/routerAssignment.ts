import express from 'express'
import * as db from '../db/dbAssignment'
import { Assignment } from '../../models/modelAssignment'

const router = express.Router()

// GET /api/v1/assignments for getting all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await db.getAssignments()
    res.json(assignments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch assignments' })
  }
})

// GET /api/v1/assignments/:id for getting a specific assignment by id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    const assignment = await db.getAssignmentById(id)
    if (!assignment) {
      return res.sendStatus(404)
    }

    res.json(assignment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// POST /api/v1/assignments to add a new assignment
router.post('/', async (req, res) => {
  try {
    const newAssignment: Assignment = req.body
    const id = await db.addAssignment(newAssignment)
    res.status(201).json({ id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// PATCH /api/v1/assignments/:id for updating an assignment by id
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    const updatedAssignment: Partial<Assignment> = req.body
    await db.updateAssignmentById(updatedAssignment, id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// DELETE /api/v1/assignments/:id for deleting an assignment by id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    await db.deleteAssignmentById(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

export default router
