import { useQuery } from '@tanstack/react-query'
import { gqlClient } from '../clients/graphqlClient'
import { GetCurrentUser } from '../graphql/query/user'

export const useGetCurrentUser = () => {
   const {data, isLoading} =  useQuery({
        queryKey: ['currentUser'],
        queryFn: () => gqlClient.request(GetCurrentUser),
    })
    
    return {data: data?.getCurrentUser, isLoading}
}

