import { graphql } from "../../gql";

export const GetAllTweets = graphql(`#graphql
    query GetAllTweets {
        getAllTweets {
            id
            content
            author {
            firstName
            lastName
            id
            }
        }
    }

`)