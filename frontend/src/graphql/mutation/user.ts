import { graphql } from "../../gql";

export const SignupUser = graphql(`#graphql
    mutation signupUser($user: SignupUser) {
    SignupUser(user: $user)
  }
  `)

export const FollowUser = graphql(`#graphql
  mutation followUser($followingId: String) {
  FollowUser(followingId: $followingId)
}
`)

export const UnfollowUser = graphql(`#graphql
  mutation unfollowUser($followingId: String) {
    UnFollowUser(followingId: $followingId)
  }
`)