import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:4000/graphql'
const token = `Bearer ${localStorage.getItem("__twitter_token")}`
console.log(token)

export const gqlClient = new GraphQLClient(endpoint, {
    headers: {
    Authorization: token,
    }
})

