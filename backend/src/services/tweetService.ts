import { prismaClient } from "../clients/prismaClient"

export class TweetService {
    public static async getAllUserTweets(id: string) {
        const tweets = await prismaClient.tweet.findMany({
            where: {
                authorId: id
            }
        })
        return tweets
    }

    public static async getAllTweets () {
        const tweets = await prismaClient.tweet.findMany()
        return tweets
    }

    public static async createTweet (content: string, authorId: string) {
        const tweet = await prismaClient.tweet.create({
            data: {
                content: content,
                author: {connect: {id: authorId}}
            }})
        return tweet   
    }
}