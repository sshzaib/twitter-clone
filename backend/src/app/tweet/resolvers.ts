import { prismaClient } from "../../clients/prismaClient";
import { CreateTweet, GraphqlContext } from "../../types";
import { User } from "../user";

const queries = {
    async getAllTweets(parent: any, args: any, ctx: GraphqlContext) {
        try {
            if (!ctx.user) {
                throw new Error("User is not authorized")
            }
            const tweets = await prismaClient.tweet.findMany()
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
            
            const tweet = await prismaClient.tweet.create({
                data: {
                    content: args.data.content,
                    author: {connect: {id: ctx.user.id}}
                }})
            return tweet      
            
        } catch (error) {
            console.log(error)
        }
    }
}

const extraResolvers = {
    Tweet: {
        async author(parent: any, args: any, cxt: GraphqlContext) {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: parent.autherId
                }
            })
            return user
        }
    }
}

export const resolvers = {queries, mutations, extraResolvers}
