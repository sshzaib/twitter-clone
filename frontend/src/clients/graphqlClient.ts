import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:4000/graphql'
export const gqlClient = new GraphQLClient(endpoint, {
    headers: {
    Authorization: `Bearer ${localStorage.getItem("__twitter_token")}`,
    }
})

