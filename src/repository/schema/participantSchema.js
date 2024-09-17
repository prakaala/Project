import mongoose from "mongoose";
import { PARTICPANTS_ROLE } from "../../constants.js";


const participantSchema = new mongoose.Schema({
    name:{
        type:String, 
        required: true
    },

    age:{
        type:Number,
        required: true
    }, 
    role: {
        type:String, 
        required: true,
        enum: PARTICPANTS_ROLE
    }, 


})

//creating a model from schema
const Participants = mongoose.model('Participants', participantSchema)
export default Participants

