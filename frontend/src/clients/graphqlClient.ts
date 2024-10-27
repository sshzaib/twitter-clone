import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:4000/graphql'
const token = `${localStorage.getItem("__twitter_token")}`

export const gqlClient = new GraphQLClient(endpoint, {
    headers: {
    Authorization: token,
    }
})

