import {getAllParticipants, 
    createParticipantByName, 
    getParticipantByID, 
    updateParticipantByID,
     deleteByID} from "../repository/participantsRepository.js"
    
import {getDataFromRedis, setDataToRedis, invalidateKey} from '../lib/redisHelper.js'


const REDIS_KEY ='participants'
const REDIS_CACHE = 3600

export const getAllParticipant = async (req, res) =>{

    const resultformRedis = await getDataFromRedis(REDIS_KEY)
    if(resultformRedis){
        console.log("Found data from redis", REDIS_KEY)
        res.status(200).json(resultformRedis)
        return
    }
    const result = await getAllParticipants();
    console.log("Getting data from database:")
    await setDataToRedis(REDIS_KEY, result, REDIS_CACHE)

    res.status(200).json(result)

}

export const createParticipant = async(req, res) =>{

    const {name, age, role} = req.body

    const result = await createParticipantByName(name, age, role)

    await invalidateKey(REDIS_KEY)
    console.log(result)

    res.status(201).json(result)

}

export const getSingleParticipant = async(req, res) =>{
    const id = req?.params.id?? '';
    const resultformRedis = await getDataFromRedis(REDIS_KEY)
    if(resultformRedis){
        console.log("Found data from redis", REDIS_KEY)
        const participant = resultformRedis?.find(result=> result?.id === id )
        res.status(200).json(participant)
    }

    const result = await getParticipantByID(id)
    console.log("Getting data from database:")
    if(!result){
        res.status(404).json({message: 'Not Found'})
        return
    }

    res.status(200).json(result)
}

export const updateParticipant = async(req, res) =>{

    const id = req?.params.id?? '';
    const {name, age, role } = req.body

    const result = await updateParticipantByID(id, name, age, role)
    

    if(!result){
        res.status(404).json({message:'Not Found'})
    }
    await invalidateKey(REDIS_KEY)
    res.status(201).json(result)


}



export const delParticipant = async (req, res) =>{

    const id = req?.params.id?? '';
    const status = await deleteByID(id)
    
    if(!status){
        res.status(404).json({message:'Not Found'})
    }
    await invalidateKey(REDIS_KEY)
    res.status(204).json()

}



