import express from 'express'
import * as db from '../db/dbTask'
import { Task } from '../../models/modelTask'

const router = express.Router()

// GET /api/v1/tasks for getting all tasks
router.get('/', async (reqt, res) => {
  try {
    const tasks = await db.getTasks()
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

// PATCH /api/v1/tasks/:id for updating a task by id
router.patch('/:id', async (req, res) => {
  try {
    const { TaskName, Description, Duration, IsPriority, IsCompleted } =
      req.body
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    const updatedTask: Task = {
      TaskId: id,
      TaskName,
      Description,
      Duration,
      IsPriority,
      IsCompleted,
    }
    await db.updateTaskById(updatedTask, id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// DELETE /api/v1/tasks/:id for deleting a task by id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.sendStatus(400)
    }

    await db.deleteTaskById(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

// POST /api/v1/tasks to add a new task
router.post('/', async (req, res) => {
  try {
    const { TaskName, Description, Duration, IsPriority, IsCompleted } =
      req.body
    const newTask: Task = {
      TaskId: 0,
      TaskName,
      Description,
      Duration,
      IsPriority,
      IsCompleted,
    }
    const id = await db.addTask(newTask)
    res.status(201).json({ TaskId: id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

export default router
