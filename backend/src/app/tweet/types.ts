export const types = `#graphql
    input CreateTweetData {
        content: String!
    }

    type Tweet {
        id: ID!
        content: String!

        author: User
    }
`