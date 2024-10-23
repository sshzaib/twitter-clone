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
        firstName: String!
        lastName: String
        email: String!
        password: String!
    }
`;