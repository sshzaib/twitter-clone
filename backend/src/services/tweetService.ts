import { prismaClient } from "../clients/prismaClient"
import { RedisService } from "./redisService"

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
        const tweets = await prismaClient.tweet.findMany({orderBy: {createdAt: "desc"}})
        return tweets
    }

    public static async createTweet (content: string, authorId: string) {
        const cachedTweet = await RedisService.Get(`Tweet:${authorId}`)
        if (cachedTweet) {
            throw new Error("wait some time to post tweet")
        }
        const tweet = await prismaClient.tweet.create({
            data: {
                content: content,
                author: {connect: {id: authorId}}
        }})
        await RedisService.AddWithLowExpiration(`Tweet:${authorId}`, content)
        return tweet   
    }
}