import {graphql} from "../../gql"

export const LoginUser = graphql(`#graphql
    query loginUser($loginCred: LoginCred) {
    LoginUser(loginCred: $loginCred)
}
`)

export const GetCurrentUser = graphql(`#graphql
    query getCurrentUser {
  getCurrentUser {
    id
    firstName
    lastName
    email
    password
  }
}`)

export const GetUserById = graphql(`#graphql
  query getUserById($userId: ID) {
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      tweets {
        id
        content
        author {
          id
          firstName
          lastName
        }
      }
    }
  }
`)

export const GetRecommendedPeople = graphql(`#graphql
  query getRecommendedPeople($userId: String!) {
    getRecommendedPeople(userId: $userId) {
      id
      firstName
      lastName
      email
    }
  } 
  `)


