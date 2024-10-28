import { redisClient } from "../clients/redisClient"

export class RedisService {
    public static async Add (key: string, value: string) {
        await redisClient.set(key, value)
    }
    
    public static async Delete(key: string) {
        await redisClient.del(key)
    }

}
