import { gqlClient } from "../../clients/graphqlClient"
import {graphql} from "../../gql"

export const VerifyLoginUser = graphql(`#graphql
    query VerifyLoginUser($loginCred: LoginCred) {
    verifyLoginUser(loginCred: $loginCred)
}
`)

