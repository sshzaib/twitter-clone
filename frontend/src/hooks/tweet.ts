import { useMutation, useQuery } from "@tanstack/react-query"
import { gqlClient } from "../clients/graphqlClient"
import { GetAllTweets } from "../graphql/query/tweet"
import { CreateTweet } from "../graphql/mutation/tweet"

export const useGetAllTweets = () => {
    const {data} =  useQuery({
         queryKey: ['getAllTweets'],
         queryFn: () => gqlClient.request(GetAllTweets),
     })
     
    return {tweets: data?.getAllTweets}
}

export const useCreateTweet = (tweet: string) => {
    const mutation = useMutation({
        mutationFn: async () => {
            return await gqlClient.request(CreateTweet, {
                data: {
                    content: tweet
                }
            })
        }
      })
    return mutation
}