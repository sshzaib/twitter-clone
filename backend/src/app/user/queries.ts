export const queries = `#graphql
    LoginUser(loginCred: LoginCred): String
    getCurrentUser: User
    getUserById(userId: ID): User
    getRecommendedPeople(userId: String!): [User]
`;

