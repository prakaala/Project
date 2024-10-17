import mongoose from 'mongoose'

const connect = async (dbName)=>{

    try{
        let connectionStr = process.env.MONGO_URI ||''

        if (connectionStr ===''){
            throw new error('No connection String Found')
        }

        connectionStr.replace(`{1}`, dbName)
        await mongoose.connect(connectionStr)
        console.log("Successfully connected to DB")
        
    }catch(error){
        console.log("CouldNot connect to DB")
        console.log(error?.message)
        process.exit()
    }
}

export default connect