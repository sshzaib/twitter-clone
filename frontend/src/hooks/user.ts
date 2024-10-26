import { useQuery } from '@tanstack/react-query'
import { gqlClient } from '../clients/graphqlClient'
import { GetCurrentUser, GetUserById } from '../graphql/query/user'

export const useGetCurrentUser = () => {
   const {data, isLoading} =  useQuery({
        queryKey: ['currentUser'],
        queryFn: () => {
            console.log("request")
            return gqlClient.request(GetCurrentUser)
        },
    })
    return {data: data?.getCurrentUser, isLoading}
}

export const useGetUserById = (id: string) => {
    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => gqlClient.request(GetUserById, {id})
    })
    return {...query}
}
