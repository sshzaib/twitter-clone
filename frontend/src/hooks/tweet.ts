import { useQuery } from "@tanstack/react-query"
import { gqlClient } from "../clients/graphqlClient"
import { GetAllTweets } from "../graphql/query/tweet"

export const useGetAllTweets = () => {
    const {data} =  useQuery({
         queryKey: ['getAllTweets'],
         queryFn: () => gqlClient.request(GetAllTweets),
     })
     
     return {tweets: data?.getAllTweets}
 }