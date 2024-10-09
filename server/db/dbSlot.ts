import db from '../db/connection'
import { TimeSlot } from '../../models/modelSlot'

// get all time slots from the database
export async function getTimeSlots(): Promise<TimeSlot[]> {
  return db('time_slots').select('id', 'start_time', 'end_time')
}

// update a time slot by ID
export async function updateTimeSlotById(
  updatedTimeSlot: Partial<TimeSlot>,
  id: number,
) {
  const result = await db('time_slots').where({ id }).update(updatedTimeSlot)
  return result
}

// get a time slot by ID
export async function getTimeSlotById(
  id: number,
): Promise<TimeSlot | undefined> {
  const result = await db('time_slots')
    .where({ id })
    .select('id', 'start_time', 'end_time')
    .first()
  return result
}

// add a new time slot to the database
export async function addTimeSlot(newTimeSlot: TimeSlot): Promise<number> {
  const result = await db('time_slots').insert({
    startTime: newTimeSlot.start_time,
    endTime: newTimeSlot.end_time,
    userId: newTimeSlot.id,
  })
  return result[0] // Assuming id is auto-generated
}

// delete a time slot by ID
export async function deleteTimeSlotById(id: number) {
  const result = await db('time_slots').where({ id }).delete()
  return result
}
