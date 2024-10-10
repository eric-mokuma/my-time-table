import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/apiUsers'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/modelUsers'

export function useUsers() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return API.getUsers(token)
    },
  })

  const addUser = useMutation({
    mutationFn: async (newUser: User) => {
      const token = await getAccessTokenSilently()
      return API.addUser(newUser, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const updateUser = useMutation({
    mutationFn: async (updatedUser: User) => {
      const token = await getAccessTokenSilently()
      return API.updateUser(updatedUser, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const deleteUser = useMutation({
    mutationFn: async (id: number) => {
      const token = await getAccessTokenSilently()
      return API.deleteUser(id, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    ...query,
    addUser,
    updateUser,
    deleteUser,
  }
}
