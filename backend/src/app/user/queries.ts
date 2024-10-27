export const queries = `#graphql
    LoginUser(loginCred: LoginCred): String
    getCurrentUser: User
    getUserById(Id: ID): User
    getRecommendedPeople(userId: String!): [User]
`;

