import { User } from "@prisma/client";
import { prismaClient } from "../clients/prismaClient";
import { JWT } from "./jwtService";

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
            return result ? true : false
        } catch (error) {
            throw new Error("User not found")
        }
    }

    public static async getFollowers(userId: string) {
        try {
            const followers = await prismaClient.follow.findMany({
                where: {
                    followingId: userId
                },
                include: {
                    follower: true
                }
            })
            return followers.map((follower)=> follower.follower)
        } catch (error) {
            return null
        }
    }

    public static async getFollowings(userId: string) {
        try {
            const followings = await prismaClient.follow.findMany({
                where: {
                    followerId: userId
                },
                include: {
                    following: true
                }
            })
            return followings.map((follower)=> follower.following)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    public static async unfollowUser(followerId: string, followingId: string) {
        try {
            await prismaClient.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId
                    }
                }
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    public static async recommendedPeople(userId: string){
        try {
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
            console.log(people)
            console.log(people[0].following.followers)
            const recommendedPeople = []
            for (const following of people) {
                for (const followingOfFollowing of following.following.followers) {
                    if (people.findIndex((el)=> el.following.id == followingOfFollowing.following.id) == -1) {
                        recommendedPeople.push(followingOfFollowing.following)
                    }
                }
            }
            return recommendedPeople
        } catch (error) {
            console.log(error)
            return []
        }
    }
}