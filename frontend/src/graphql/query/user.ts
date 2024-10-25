import { gqlClient } from "../../clients/graphqlClient"
import {graphql} from "../../gql"

export const LoginUser = graphql(`#graphql
    query loginUser($loginCred: LoginCred) {
    LoginUser(loginCred: $loginCred)
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

const eoginUser = await gqlClient.request(LoginUser, {loginCred: {email: "passive@gmail.com", password: "123"}})



