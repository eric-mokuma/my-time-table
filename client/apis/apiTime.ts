import request from 'superagent'
import { TimeSlot } from '../../models/modelSlot'

const rootUrl = '/api/v1'

export async function fetchAllTimeSlots(): Promise<TimeSlot[]> {
  const response = await request.get(`${rootUrl}/timeslots`)
  return response.body
}

export async function fetchTimeSlotById(id: number): Promise<TimeSlot> {
  const response = await request.get(`${rootUrl}/timeslots/${id}`)
  return response.body
}

export async function createTimeSlot(
  newTimeSlot: Omit<TimeSlot, 'id'>,
): Promise<TimeSlot> {
  const response = await request.post(`${rootUrl}/timeslots`).send(newTimeSlot)
  return response.body
}

export async function updateTimeSlotById(
  id: number,
  updatedTimeSlot: TimeSlot,
): Promise<void> {
  await request.patch(`${rootUrl}/timeslots/${id}`).send(updatedTimeSlot)
}

export async function deleteTimeSlotById(id: number): Promise<void> {
  await request.delete(`${rootUrl}/timeslots/${id}`)
}
