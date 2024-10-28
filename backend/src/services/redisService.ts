import { redisClient } from "../clients/redisClient"

export class RedisService {
    public static async Add (key: string, value: string) {
        await redisClient.set(key, value)
    }

    public static async AddWithExpiration (key: string, value: string) {
        await redisClient.set(key, value, "EX", 1 * 24 * 60 * 60) // cache for a day
    }


    public static async Delete(key: string) {
        await redisClient.del(key)
    }

    public static async Get(key: string) {
        return await redisClient.get(key)
    }

}
