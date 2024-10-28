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

    public static async LikeTweet (userId: string, tweetId: string) {
        try {
            const likeTweet = await prismaClient.likeTweet.create({
                data: {
                    userId,
                    tweetId
                }
            })
            return likeTweet ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    public static async UnlikeTweet(userId: string, tweetId: string) {
        try {
            const likeTweet = await prismaClient.likeTweet.delete({
                where: {
                    userId_tweetId: {
                        userId,
                        tweetId
                    }
                }
            })
            return likeTweet ? true : false   
        } catch (error) {
            console.log(error)
            return false
        }
    }

    public static async getLikedTweets(userId: string) {
        try {
            const likedTweets = await prismaClient.likeTweet.findMany({
                where: {
                    userId
                },
                include: {
                    tweet: true
                }
            })
            return likedTweets.map(tweet => tweet.tweet)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    public static async getUsersThatLikedTweet (tweetId: string) {
        const users = await prismaClient.likeTweet.findMany({
            where: {
                tweetId
            },
            include: {
                user: true
            }
        })
        return users.map(user => user.user)
    }
}