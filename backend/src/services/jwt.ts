import { User } from "@prisma/client";
import jwt from "jsonwebtoken"
import { JwtUser } from "../types";

export class JWT { 
    public static createToken(user: User) {
        const payload: JwtUser = {
            id: user.id,
            email: user.email
        }
        return jwt.sign(payload, process.env.JWT_SECRET)
    }
     public static async decodeJwtToken(token: string) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            return payload
        } catch (error) {
            console.log(error)
            return null
        }
    }
}