import { User } from "@prisma/client"
import { JWT } from "../../services/jwtService"
import { GraphqlContext } from "../../types"
import { UserService } from "../../services/userService"
import { TweetService } from "../../services/tweetService"

const queries = {
    async LoginUser(parent :any, { loginCred }: { loginCred: { email: string, password: string } }) {
        const user = await UserService.loginUser(loginCred)
        if (!user) {
            throw new Error("incorrect email or password")
        }
        const token = JWT.createToken(user)
        return token
    },
    async getCurrentUser (parent :any, args: any, ctx: GraphqlContext) {
       try {
            const user = await UserService.findUserWithEmail(ctx.user.email)
            return user
       } catch (error) {
            console.log(error)
            return null
       }
    },
    async getUserById (parent: any, {userId}: {userId: string}, ctx: GraphqlContext) {
        try {
            const user = await UserService.findUserWithId(userId)
            if (!user) {
                return null
            }
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    },
    async getRecommendedPeople (parent: any, {userId}: {userId: string}, ctx: GraphqlContext) {
        const recommendedPeople = await UserService.recommendedPeople(userId)
        return recommendedPeople
    }
}

const mutations = {
    async SignupUser(parent: any, {user}: {user: User}) {
        const token = UserService.createUser(user)
        return token
    },
    async FollowUser(parent: any, {followingId}: {followingId: string}, ctx: GraphqlContext) {
        if (!ctx.user || !ctx.user.id) {
            throw new Error("Unauthorized")
        }
        const result = await UserService.followUser(ctx.user.id,followingId)
        return result
        
    },
    async UnFollowUser(_: any, {followingId}: {followingId: string}, ctx: GraphqlContext) {
        if (!ctx.user || !ctx.user.id) {
            throw new Error("Unauthorized")
        }
        const result = await UserService.unfollowUser(ctx.user.id, followingId)
        return result
    } 
}

const extraResolvers = {
    User: {
        async tweets(parent: User, args: any, ctx: GraphqlContext) {
            const tweets = await TweetService.getAllUserTweets(parent.id)
            return tweets
        },
        async followers(parent: User, args: any, ctx: GraphqlContext) {
            if (!ctx.user || !ctx.user.id) {
                throw new Error("unauthorized")
            }
            const followers = await UserService.getFollowers(parent.id)
            return followers
        },
        async followings(parent: User, args: any, ctx: GraphqlContext) {
            if (!ctx.user || !ctx.user.id) {
                throw new Error("unauthorized")
            }
            const followings = await UserService.getFollowings(parent.id)
            return followings
        },
        async likedTweets (parent: User, args: any, ctx: GraphqlContext) {
            if (!ctx.user || !ctx.user.id) {
                throw new Error("unauthorized")
            }
            const likedTweets = await TweetService.getLikedTweets(parent.id)
            return likedTweets
        }
    }
}

export const resolvers = {queries, mutations, extraResolvers}