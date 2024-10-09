import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/apiUsers'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/modelUsers'
export function useUsers() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getAccessTokenSilently().catch(() => {
        console.error('Login Required')
        return ''
      })
      if (!token) return []
      try {
        return await API.getUsers(token)
      } catch (error) {
        console.error('Error fetching users:', error)
        return []
      }
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddUser(),
    update: useUpdateUser(),
    delete: useDeleteUser(),
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      console.error('Mutation failed:', error)
    },
  })

  return mutation
}

export function useAddUser() {
  const { getAccessTokenSilently } = useAuth0()
  return useUserMutation(async (newUser: User) => {
    const token = await getAccessTokenSilently()
    return API.addUser(newUser, token)
  })
}

export function useUpdateUser() {
  const { getAccessTokenSilently } = useAuth0()
  return useUserMutation(async (updatedUser: User) => {
    const token = await getAccessTokenSilently()
    return API.updateUser(updatedUser, token)
  })
}

export function useDeleteUser() {
  const { getAccessTokenSilently } = useAuth0()
  return useUserMutation(async (id: number) => {
    const token = await getAccessTokenSilently()
    return API.deleteUser(id, token)
  })
}
