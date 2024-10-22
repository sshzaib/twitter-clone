export const types = `#graphql
    input LoginCred {
        email: String!
        password: String!
    }

    input User {
        firstName: String!
        lastName: String
        email: String!
        password: String!
    }
`;