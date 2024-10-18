import express from "express"
import dotenv from 'dotenv'
import { DB_NAME  } from "./constants.js"
import connect from "./config/db.js"

import  participants from "./controller/participantController.js"
import movies from "./controller/movieController.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({encoded:true}))

app.get('/ping', (req, res)=>{
        res.status(200).json({"message": "pong"})
})  

app.use('/participants', participants)
app.use('/movies', movies)

const PORT = process.env.PORT 
await connect(DB_NAME)
app.listen(PORT, ()=> console.log(`Server Started on Port  ${PORT}`))