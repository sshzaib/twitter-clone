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
    async getUserById (parent: any, {id}: {id: string}, ctx: GraphqlContext) {
        try {
            const user = await UserService.findUserWithId(ctx.user.id)
            if (!user) {
                return null
            }
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

const mutations = {
    async SignupUser(parent: any, {user}: {user: User}) {
        const token = UserService.createUser(user)
        return token
    },
    async FollowUser(parent: any, {followingId}: {followingId: string}, ctx: GraphqlContext) {
        await UserService.followUser(ctx.user.id,followingId)
    }
}

const extraResolvers = {
    User: {
        async tweets(parent: User, args: any, cxt: GraphqlContext) {
            const tweets = await TweetService.getAllUserTweets(parent.id)
            return tweets
        }
    }
}

export const resolvers = {queries, mutations, extraResolvers}