export const types = `#graphql
    input LoginCred {
        email: String!
        password: String!
    }

    input SignupUser {
        firstName: String!
        lastName: String
        email: String!
        password: String!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        password: String!
        
        tweets: [Tweet]
    }
`;