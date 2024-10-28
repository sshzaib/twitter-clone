import { Tweet } from "@prisma/client";
import { TweetService } from "../../services/tweetService";
import { UserService } from "../../services/userService";
import { CreateTweet, GraphqlContext } from "../../types";

const queries = {
    async getAllTweets(parent: any, args: any, ctx: GraphqlContext) {
        try {
            if (!ctx.user) {
                throw new Error("User is not authorized")
            }
            const tweets = await TweetService.getAllTweets()
            return tweets
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
const mutations = {
    async CreateTweet (parent: any, args: CreateTweet, ctx: GraphqlContext) {
        try {
            if (!ctx.user) {
                throw new Error("User is not authorized")
            }
            const tweet = await TweetService.createTweet(args.data.content, ctx.user.id)
            return tweet      
            
        } catch (error) {
            console.log(error)
        }
    },

    async LikeTweet(parent: any, {tweetId}: {tweetId: string}, ctx: GraphqlContext) {
        if (!ctx.user) {
            throw new Error("Unauthorized")
        }

        return await TweetService.LikeTweet(ctx.user.id, tweetId)
    }, 

    async UnlikeTweet(parent: any, {tweetId}: {tweetId: string}, ctx: GraphqlContext) {
        if (!ctx.user) {
            throw new Error("Unauthorized")
        }

        return await TweetService.UnlikeTweet(ctx.user.id, tweetId)
    }, 
}

const extraResolvers = {
    Tweet: {
        async author(parent: Tweet, args: any, ctx: GraphqlContext) {
            if (!ctx.user) {
                throw new Error("Unauthorized")
            }
            const user = await UserService.findUserWithId(parent.authorId)
            return user
        },
        async likedBy(parent: Tweet, args: any, ctx: GraphqlContext) {
            if (!ctx.user) {
                throw new Error("Unauthorized")
            }
            const usersThatLikedTweet = await TweetService.getUsersThatLikedTweet(parent.id)
            return usersThatLikedTweet
        }
    }
}

export const resolvers = {queries, mutations, extraResolvers}
