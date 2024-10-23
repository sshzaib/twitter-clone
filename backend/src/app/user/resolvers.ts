import { User } from "@prisma/client"
import { prismaClient } from "../../clients/prismaClient"
import { JWT } from "../../services/jwt"
import { GraphqlContext } from "../../types"

const queries = {
    async verifyLoginUser(parent :any, { loginCred }: { loginCred: { email: string, password: string } }) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: loginCred.email,
                password: loginCred.password
            }
        })
        if (!user) {
            throw new Error("incorrect email or password")
        }
        const token = JWT.createToken(user)
        return token
    },
    async getCurrentUser (parent :any, args: any, cxt: GraphqlContext) {
       try {
            const user = prismaClient.user.findFirst({where:{
                email: cxt.user.email
            }})
            return user
       } catch (error) {
            console.log(error)
            return null
       }
    },
}

const mutations = {
    async SignupUser(parent: any, {user}: {user: User}) {
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
}

const extraResolvers = {
    User: {
        async tweets(parent: any, args: any, cxt: GraphqlContext) {
            console.log(parent)
            const tweets = await prismaClient.tweet.findMany({
                where: {
                    authorId: parent.id
                }
            })
            console.log(tweets)
            return tweets
        }
    }
}


export const resolvers = {queries, mutations, extraResolvers}