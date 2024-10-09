import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TimeSlot } from '../../models/modelSlot'
import {
  fetchAllTimeSlots,
  fetchTimeSlotById,
  createTimeSlot,
  updateTimeSlotById,
  deleteTimeSlotById,
} from '../apis/apiTime'

export function useTime() {
  const queryClient = useQueryClient()

  const {
    data: timeSlots,
    error,
    isLoading,
  } = useQuery<TimeSlot[], Error>({
    queryKey: ['timeSlots'],
    queryFn: fetchAllTimeSlots,
  })

  const addTimeSlot = useMutation({
    mutationFn: (newTimeSlot: Omit<TimeSlot, 'id'>) =>
      createTimeSlot(newTimeSlot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    },
  })

  const updateTimeSlot = useMutation({
    mutationFn: (updatedTimeSlot: TimeSlot) =>
      updateTimeSlotById(updatedTimeSlot.id, updatedTimeSlot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    },
  })

  const deleteTimeSlot = useMutation({
    mutationFn: (id: number) => deleteTimeSlotById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    },
  })

  return {
    timeSlots,
    error,
    isLoading,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
    getTimeSlotById: fetchTimeSlotById,
  }
}
