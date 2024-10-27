import { useQuery } from '@tanstack/react-query'
import { gqlClient } from '../clients/graphqlClient'
import { GetCurrentUser, GetRecommendedPeople, GetUserById } from '../graphql/query/user'

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

export const useGetUserById = (userId: string) => {
    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => gqlClient.request(GetUserById, {userId})
    })
    return {...query}
}

export const useGetRecommendedPeople = (userId: string) => {
    const query = useQuery({
        queryKey: ['recommendedPeople'],
        queryFn: () => gqlClient.request(GetRecommendedPeople, {userId})
    })
    return {...query}
}
