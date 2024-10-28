import { User } from "@prisma/client";
import { prismaClient } from "../clients/prismaClient";
import { JWT } from "./jwtService";
import { redisClient } from "../clients/redisClient";
import { RedisService } from "./redisService";

export class UserService {
    public static async loginUser({email, password}: {email: string, password: string}) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })
        return user
    }
    
    public static async findUserWithEmail(email: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                email
            }
        })
        return user
    }
    public static async findUserWithId(id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id
            }
        })
        return user
    }

    public static async createUser(user: User) {
        const prevUser = await prismaClient.user.findFirst({
            where: {
                email: user.email,
            }
        })
        if (prevUser) {
            throw new Error("user with email already exist")
        }
        const newUser = await prismaClient.user.create({
            data: {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
        const token = JWT.createToken(newUser)
        return token
    }

    public static async followUser(followerId: string, followingId: string){
        try {
            const result = await prismaClient.follow.create({
                data: {
                    followerId,
                    followingId
                }
            })
            await RedisService.Delete(`RecommendedUsers:${followerId}`)
            await RedisService.Delete(`Followers:${followerId}`)
            await RedisService.Delete(`Followings:${followerId}`)
            await RedisService.Delete(`Followers:${followingId}`)
            await RedisService.Delete(`Followings:${followingId}`)
            return result ? true : false
        } catch (error) {
            throw new Error("User not found")
        }
    }

    public static async getFollowers(userId: string) {
        try {
            const cachedFollowers = JSON.parse(await RedisService.Get(`Followers:${userId}`))
            if (cachedFollowers) {
                return cachedFollowers
            }
            const followers = await prismaClient.follow.findMany({
                where: {
                    followingId: userId
                },
                include: {
                    follower: true
                }
            })
            await RedisService.AddWithExpiration(`Followers:${userId}`, JSON.stringify(followers.map((follower) => follower.follower)))
            return followers.map((follower) => follower.follower)
        } catch (error) {
            return null
        }
    }

    public static async getFollowings(userId: string) {
        try {
            const cachedFollowings = JSON.parse(await RedisService.Get(`Followings:${userId}`))
            if (cachedFollowings) {
                return cachedFollowings
            }
            const followings = await prismaClient.follow.findMany({
                where: {
                    followerId: userId
                },
                include: {
                    following: true
                }
            })
            await RedisService.AddWithExpiration(`Followings:${userId}`, JSON.stringify(followings.map((following) => following.following)))
            return followings.map((following)=> following.following)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    public static async unfollowUser(followerId: string, followingId: string) {
        try {
            const user = await prismaClient.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId
                    }
                }
            })
            await RedisService.Delete(`RecommendedUsers:${followerId}`)
            await RedisService.Delete(`Followers:${followerId}`)
            await RedisService.Delete(`Followings:${followerId}`)
            await RedisService.Delete(`Followers:${followingId}`)
            await RedisService.Delete(`Followings:${followingId}`)

            return user ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    public static async recommendedPeople(userId: string){
        try {
            const cachedRecommendedPeople = JSON.parse(await RedisService.Get(`RecommendedUsers:${userId}`))
            if (cachedRecommendedPeople) {
                return cachedRecommendedPeople
            }

            const people = await prismaClient.follow.findMany({
                where: {
                    followerId: userId
                },
                include: {
                    following: {
                        include: {followers: {include: {following: true}}}
                    }
                },
            })
            const recommendedPeople = []
            for (const following of people) {
                for (const followingOfFollowing of following.following.followers) {
                    if (people.findIndex((el)=> el.following.id == followingOfFollowing.following.id) == -1 && followingOfFollowing.following.id !== userId) {
                        if (recommendedPeople.length >= 5) {
                            await RedisService.Add(`RecommendedUsers:${userId}`, JSON.stringify(recommendedPeople))
                            return recommendedPeople
                        }
                        recommendedPeople.push(followingOfFollowing.following)
                    }
                }
            }
            await RedisService.Add(`RecommendedUsers:${userId}`, JSON.stringify(recommendedPeople))
            return recommendedPeople
        } catch (error) {
            console.log(error)
            return []
        }
    }
}