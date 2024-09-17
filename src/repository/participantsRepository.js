import mongoose from "mongoose";
import Participants from "./schema/participantSchema.js";



export const getAllParticipants = async() =>{

    const result = await Participants.find();
    if (!result){
        return []
    }
    return result
}


export const createParticipantByName = async(name, age, role) =>{
    //this will just save in the memory
    const newParticipant = new Participants({name, age, role})
    //actually this will save in the dB
    const result = await newParticipant.save()

    return result

}


export const getParticipantByID = async(participantID) =>{
    //validate if the ID is MongoDB ID or not

    if(!mongoose.Types.ObjectId.isValid(participantID)){
        console.log("Invalid Object ID")
        return null
    }

    const result = await Participants.findById(participantID)

    if(!result){
        return null
    }

    return result
}


export const updateParticipantByID = async(participantID, name, age, role) =>{
    if(!mongoose.Types.ObjectId.isValid(participantID)){
        console.log("Invalid Object ID")
        return null
    }

    const result = await Participants.findByIdAndUpdate(participantID, {name, age, role}, {new:true})

    if(!result){
        return null
    }

    return result
}



export const deleteByID = async(participantID) =>{
    if(!mongoose.Types.ObjectId.isValid(participantID)){
        console.log("Invalid Object ID")
        return false
    }

    const result = await Participants.findByIdAndDelete(participantID)

    if(!result){
        return false
    }

    return true



}
