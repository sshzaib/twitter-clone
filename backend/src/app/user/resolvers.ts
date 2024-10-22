import { User } from "@prisma/client"
import { prismaClient } from "../../clients/prismaClient"
import { JWT } from "../../services/jwt"

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

export const resolvers = {queries, mutations}