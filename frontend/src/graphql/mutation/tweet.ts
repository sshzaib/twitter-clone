import { graphql } from "../../gql";

export const CreateTweet = graphql(`#graphql
    mutation CreateTweet($data: CreateTweetData!) {
        CreateTweet(data: $data) {
            id
            content
        }
    }
`)