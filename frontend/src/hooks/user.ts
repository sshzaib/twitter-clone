import { useQuery } from '@tanstack/react-query'
import { gqlClient } from '../clients/graphqlClient'
import { GetCurrentUser } from '../graphql/query/user'

export const useGetCurrentUser = () => {
   const {data, error, isPending} =  useQuery({
        queryKey: ['currentUser'],
        queryFn: () => gqlClient.request(GetCurrentUser)
    })
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return data.getCurrentUser
}

