export const mutations = `#graphql
    SignupUser(user: SignupUser): String!
    FollowUser(followingId: String): Boolean
    UnFollowUser(followingId: String): Boolean
`;