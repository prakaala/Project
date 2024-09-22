import mongoose from "mongoose";
import Movies from './schema/movieSchema.js'


export const getAllMovies = async() =>{

    const result = await Movies.find();
    if (!result){
        return []
    }
    return result
}


export const createMovieByName = async(name, duration, rating, genre) =>{
    //this will just save in the memory
    const newMovie = new Movies({name, duration, rating, genre})
    //actually this will save in the dB
    const result = await newMovie.save()

    return result

}


export const getMovieByID = async(movieID) =>{
    //validate if the ID is MongoDB ID or not

    if(!mongoose.Types.ObjectId.isValid(movieID)){
        console.log("Invalid Object ID")
        return null
    }

    const result = await Movies.findById(movieID)

    if(!result){
        return null
    }

    return result
}


export const updateMovieByID = async(movieID, name, duration, rating, genre) =>{
    if(!mongoose.Types.ObjectId.isValid(movieID)){
        console.log("Invalid Object ID")
        return null
    }

    const result = await Participants.findByIdAndUpdate(movieID, {name, duration, rating, genre}, {new:true})

    if(!result){
        return null
    }

    return result
}



export const deleteByID = async(movieID) =>{
    if(!mongoose.Types.ObjectId.isValid(movieID)){
        console.log("Invalid Object ID")
        return false
    }

    const result = await Participants.findByIdAndDelete(movieID)

    if(!result){
        return false
    }

    return true



}
