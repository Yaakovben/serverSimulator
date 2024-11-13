import  express  from "express";
import "dotenv/config"
import { connectToMongo } from "./config/db";
import userController from './controllers/user'
import ammuntionController from './controllers/ammuntion'
//Sockket
import http from 'http'
import {Server} from 'socket.io'



const PORT = process.env.PORT || 3000;
const app = express()

//Socket
const httpServer = http.createServer(app)
export const io = new Server(httpServer,{
  cors:{
    origin:"*",
    methods:"*"
  }
})

io.on("connection",()=>{})


connectToMongo()
app.use(express.json())

app.use("/api/users",userController)
app.use("/api/ammuntion",ammuntionController)
  
  
 

  
  
app.listen(PORT,()=>{
    console.log(`Server is running, Visit "http://localhost:${PORT}"`);
})     
  