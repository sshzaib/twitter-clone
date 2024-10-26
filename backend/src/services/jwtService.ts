import { User } from "@prisma/client";
import jwt from "jsonwebtoken"
import { JwtUser } from "../types";

export class JWT { 
    public static createToken(user: User) {
        const payload: JwtUser = {
            id: user.id,
            email: user.email
        }
        return jwt.sign(payload, "JWTS3CR3T")
    }
     public static async decodeJwtToken(token: string) {
        console.log(process.env).
        try {
            if (token == null) {
                throw new Error ("User not authenticated")
            }
            const payload = jwt.verify(token, "JWTS3CR3T")
            return payload
        } catch (error) {
            console.log(error)
            return null
        }
    }
}