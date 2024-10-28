import { graphql } from "../../gql";

export const CreateTweet = graphql(`#graphql
    mutation CreateTweet($data: CreateTweetData!) {
        CreateTweet(data: $data) {
            id
            content
        }
    }
`)

export const LikeTweet = graphql(`#graphql
    mutation likeTweet($tweetId: String) {
        LikeTweet(tweetId: $tweetId)
    }
`)

export const UnlikeTweet = graphql(`#graphql
    mutation unLikeTweet($tweetId: String) {
        UnlikeTweet(tweetId: $tweetId)
    }
`)