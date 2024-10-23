import {graphql} from "../../gql"

export const VerifyLoginUser = graphql(`#graphql
    query VerifyLoginUser($loginCred: LoginCred) {
    verifyLoginUser(loginCred: $loginCred)
}
`)

export const GetCurrentUser = graphql(`#graphql
    query getCurrentUser {
  getCurrentUser {
    firstName
    lastName
    email
    password
  }
}`)


