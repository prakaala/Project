import mongoose from "mongoose";
import { MOVIE_GENRE } from "../../constants.js";

const movieSchema = new mongoose.Schema({
    movieName:{
        type: String,
        required: true
    }, 
    movieDuration:{
        type: Number, 
        required:true, 
        min:1
    },
    movieRating:{
        type: Number, 
        required: true,
        min: 0.0,
        max:10.0

    },
    genre:{
        type: String, 
        required:true, 
        enum:MOVIE_GENRE
    },

})
