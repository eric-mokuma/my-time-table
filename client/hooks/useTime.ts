import { useState, useCallback } from 'react'
import { TimeSlot } from '../../models/modelSlot'
import {
  fetchAllTimeSlots,
  fetchTimeSlotById,
  createTimeSlot,
  updateTimeSlotById,
  deleteTimeSlotById,
} from '../apis/apiTime'

export function useTime() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchTimeSlots = useCallback(async () => {
    try {
      const fetchedTimeSlots = await fetchAllTimeSlots()
      setTimeSlots(fetchedTimeSlots)
      setError(null)
    } catch (err) {
      setError('Failed to fetch time slots')
      console.error(err)
    }
  }, [])

  const getTimeSlotById = useCallback(async (id: number) => {
    try {
      const timeSlot = await fetchTimeSlotById(id)
      setError(null)
      return timeSlot
    } catch (err) {
      setError('Failed to fetch time slot')
      console.error(err)
      return null
    }
  }, [])

  const addTimeSlot = useCallback(async (newTimeSlot: Omit<TimeSlot, 'id'>) => {
    try {
      const addedTimeSlot = await createTimeSlot(newTimeSlot)
      setTimeSlots((prev) => [...prev, addedTimeSlot])
      setError(null)
      return addedTimeSlot
    } catch (err) {
      setError('Failed to add time slot')
      console.error(err)
      return null
    }
  }, [])

  const updateTimeSlot = useCallback(async (updatedTimeSlot: TimeSlot) => {
    try {
      await updateTimeSlotById(updatedTimeSlot.id, updatedTimeSlot)
      setTimeSlots((prev) =>
        prev.map((slot) =>
          slot.id === updatedTimeSlot.id ? updatedTimeSlot : slot,
        ),
      )
      setError(null)
      return true
    } catch (err) {
      setError('Failed to update time slot')
      console.error(err)
      return false
    }
  }, [])

  const deleteTimeSlot = useCallback(async (id: number) => {
    try {
      await deleteTimeSlotById(id)
      setTimeSlots((prev) => prev.filter((slot) => slot.id !== id))
      setError(null)
      return true
    } catch (err) {
      setError('Failed to delete time slot')
      console.error(err)
      return false
    }
  }, [])

  return {
    timeSlots,
    error,
    fetchTimeSlots,
    getTimeSlotById,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
  }
}
