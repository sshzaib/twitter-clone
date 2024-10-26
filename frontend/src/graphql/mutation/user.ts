import { graphql } from "../../gql";

export const SignupUser = graphql(`#graphql
    mutation signupUser($user: SignupUser) {
    SignupUser(user: $user)
  }
  `)