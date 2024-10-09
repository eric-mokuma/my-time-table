import request from 'superagent'
import { TimeSlot } from '../../models/modelSlot'

const rootUrl = '/api/v1'

export async function fetchAllTimeSlots(): Promise<TimeSlot[]> {
  try {
    const response = await request.get(`${rootUrl}/timeslots`)
    return response.body
  } catch (error) {
    console.error('Failed to fetch all time slots:', error)
    throw error
  }
}

export async function fetchTimeSlotById(id: number): Promise<TimeSlot> {
  try {
    const response = await request.get(`${rootUrl}/timeslots/${id}`)
    return response.body
  } catch (error) {
    console.error(`Failed to fetch time slot with id ${id}:`, error)
    throw error
  }
}

export async function createTimeSlot(
  newTimeSlot: Omit<TimeSlot, 'id'>,
): Promise<TimeSlot> {
  try {
    const response = await request
      .post(`${rootUrl}/timeslots`)
      .send(newTimeSlot)
    return response.body
  } catch (error) {
    console.error('Failed to create time slot:', error)
    throw error
  }
}

export async function updateTimeSlotById(
  id: number,
  updatedTimeSlot: TimeSlot,
): Promise<void> {
  try {
    await request.patch(`${rootUrl}/timeslots/${id}`).send(updatedTimeSlot)
  } catch (error) {
    console.error(`Failed to update time slot with id ${id}:`, error)
    throw error
  }
}

export async function deleteTimeSlotById(id: number): Promise<void> {
  try {
    await request.delete(`${rootUrl}/timeslots/${id}`)
  } catch (error) {
    console.error(`Failed to delete time slot with id ${id}:`, error)
    throw error
  }
}
