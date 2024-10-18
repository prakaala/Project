
//for to createmovieService
import { getAllMovies } from "../repository/moviesRepository.js"
import { getDataFromRedis, setDataToRedis } from "../lib/redisHelper.js"


//setting up for redis cache
const REDIS_KEY =''
const REDIS_CACHE = ''


export const getAllMovie = async(req, res)=>{
    //since request -response style 
    //so need to return res.code.message format
    const resultfromRedis = await getDataFromRedis(REDIS_KEY)
    if(resultfromRedis){
        console.log("Found data from redis", REDIS_KEY)
        res.status(200).json(resultfromRedis)
        return
    }
    const result = await getAllMovies()
    if(!result){
        return null
    }
    res.status(200).json(result)
    console.log("Fetching from DB");
    await setDataToRedis(REDIS_CACHE, result, REDIS_KEY)
    //so no return here??
    return
}


export const getMoviesByID = async (req, res) =>{

}

export const createMovie = async (req, res) =>{

}

export const updateMoviesByID = async (req, res) =>{


}


export const deleteMovieByID = async (req, res) =>{

}