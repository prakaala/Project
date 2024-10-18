
//for to createmovieService
import { getAllMovies, getMovieByID, createMovieByName, updateMovieByID, deleteByID } from "../repository/moviesRepository.js"
import { getDataFromRedis, invalidateKey, setDataToRedis } from "../lib/redisHelper.js"


//setting up for redis cache
const REDIS_KEY ='movies'
const REDIS_CACHE = 3600


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
    const _id = req?.params.id?? '';
    const resultfromRedis = await getDataFromRedis(REDIS_KEY)
    if(resultfromRedis){
        console.log("Found data from redis", REDIS_KEY)
        const movie = resultfromRedis?.find(result => result?.id === _id)
        res.status(200).json(movie) 
        return
    }
    const result = await getMovieByID(id)
    if(!result){
        res.status(404).json("NotFpund")
        return null
    }
    
    console.log("Found  from DB");
    res.status(200).json(result)
    // await setDataToRedis(REDIS_CACHE, result, REDIS_KEY)
    //so no return here??
    return
}

export const createMovie = async (req, res) =>{
    const movieObj = req?.body ?? {}

    const result = await createMovieByName(movieObj)
    await invalidateKey(REDIS_KEY)

    res.status(201).json(result)


}

export const updateMoviesByID = async (req, res) =>{
    const _id = req?.params.id?? 0;
    const movieObj = req?.body ?? {}

    const result = await updateMovieByID(_id, movieObj)

    if(!result){
        res.status(404).json({message: "Couldnot find the id"})
        return
    }
    await invalidateKey(REDIS_KEY)
    res.status(200).json(result)

}


export const deleteMovieByID = async (req, res) =>{
    const _id = req?.params.id?? 0;
    const status = await deleteMovieByID(_id)

    if (!status){
        res.status(404).json({message: "Couldnot find the id"})
        return 
    }

    await invalidateKey(REDIS_KEY)
    res.status(204).json(status)

}   