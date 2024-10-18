import redisClient  from "../config/redis.js";

export const getDataFromRedis = async (key) =>{
    const cachedData = await redisClient.get(key)
    return JSON.parse(cachedData)
}

export const setDataToRedis = async (key, data, cacheDuration) =>{
    await redisClient.setex(cacheDuration, key,  JSON.stringify(data))

    return
}


export const invalidateKey = async (key) =>{
    await redisClient.del(key)
    return
}