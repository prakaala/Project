import { USER_ROLES, DEFAULT_USER } from "../../constants"
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    name :{

    }, 

    userID :{

    },
    password: {

    },

    role:{
        
    }


})


//creating the modal for userSchema
const UserSchema = mongoose.Model(userSchema)
export default UserSchema