import express from 'express'
import * as db from '../db/dbSlot'
import { TimeSlot } from '../../models/modelSlot'

const router = express.Router()

// GET /api/v1/timeslots for getting all time slots
router.get('/', async (req, res) => {
  try {
    const timeSlots = await db.getTimeSlots()
    res.json(timeSlots)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch time slots' })
  }
})

// GET /api/v1/timeslots/:id for getting a specific time slot by id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    const timeSlot = await db.getTimeSlotById(id)
    if (!timeSlot) {
      return res.sendStatus(404)
    }

    res.json(timeSlot)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// POST /api/v1/timeslots to add a new time slot
router.post('/', async (req, res) => {
  try {
    const { startTime, endTime, userId } = req.body
    const newTimeSlot: TimeSlot = { id: 0, startTime, endTime, userId }
    const id = await db.addTimeSlot(newTimeSlot)
    res.status(201).json({ id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// PATCH /api/v1/timeslots/:id for updating a time slot by id
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    const { startTime, endTime, userId } = req.body
    const updatedTimeSlot: TimeSlot = { id, startTime, endTime, userId }
    await db.updateTimeSlotById(updatedTimeSlot, id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// DELETE /api/v1/timeslots/:id for deleting a time slot by id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    await db.deleteTimeSlotById(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

export default router
