import { User } from "@prisma/client";
import jwt from "jsonwebtoken"

export class JWT { 
    public static createToken(user: User) {
        return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
    }
}