import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { DataListUser } from '../interface/user.interface'
import { userAPI } from '../apis/user.api'

type useListUserOption = Omit<UseQueryOptions<DataListUser>, 'queryKey' | 'queryFn'>

export const useListUser = (currentPage: number, options?: useListUserOption) => {
  const queryResult = useQuery({
    queryKey: ['list-user', { currentPage }],
    queryFn: () =>
      userAPI.getAllUser<DataListUser>({
        page: currentPage,
      }),
    ...options,
  })

  return queryResult
}
