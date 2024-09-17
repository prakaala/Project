import Redis from "ioredis"


const redisClient = new Redis({
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT
})


redisClient.on('error', (err) =>{
    console.log('Redis Error', err?.message)
    //no need to exit the process 
     
})

//crud functionality in redis


export default redisClient