import db from '../db/connection';
import { TimeSlot } from '../../models/modelSlot'; 

// Function to get all time slots from the database
export async function getTimeSlots(): Promise<TimeSlot[]> {
  return db('time_slots').select('id', 'startTime', 'endTime', 'userId');
}

// Function to update a time slot by ID
export async function updateTimeSlotById(updatedTimeSlot: Partial<TimeSlot>, id: number) {
  const result = await db('time_slots').where({ id }).update(updatedTimeSlot);
  return result;
}

// Function to get a time slot by ID
export async function getTimeSlotById(id: number): Promise<TimeSlot | undefined> {
  const result = await db('time_slots')
    .where({ id })
    .select('id', 'startTime', 'endTime', 'userId')
    .first();
  return result;
}

// Function to add a new time slot to the database
export async function addTimeSlot(newTimeSlot: TimeSlot): Promise<number> {
  const result = await db('time_slots').insert({
    startTime: newTimeSlot.startTime,
    endTime: newTimeSlot.endTime,
    userId: newTimeSlot.userId,
  });
  return result[0]; // Assuming id is auto-generated
}

// Function to delete a time slot by ID
export async function deleteTimeSlotById(id: number) {
  const result = await db('time_slots').where({ id }).delete();
  return result;
}
