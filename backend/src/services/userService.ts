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
}