export const mutations = `#graphql
    CreateTweet(data: CreateTweetData!): Tweet
    LikeTweet(tweetId: String): Boolean
    UnlikeTweet(tweetId: String): Boolean
`