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
    }
}

const extraResolvers = {
    Tweet: {
        async author(parent: any, args: any, cxt: GraphqlContext) {
            const user = await UserService.findUserWithId(parent.autherId)
            return user
        }
    }
}

export const resolvers = {queries, mutations, extraResolvers}
