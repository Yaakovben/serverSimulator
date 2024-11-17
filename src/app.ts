import  express  from "express";
import "dotenv/config"
import { connectToMongo } from "./config/db";
import userController from './controllers/user'
import ammuntionController from './controllers/ammuntion'
import cors from "cors";
//Sockket
import http from 'http'
import socket from 'socket.io'
import { handelconnection } from "./socket/io";

const PORT = process.env.PORT || 3000;
const app = express()
//Socket
const httpServer = http.createServer(app);
export const io = new socket.Server(httpServer, {
  cors: {
    origin: "*",
    methods:"*",
  },
});
io.on("connection",handelconnection)

connectToMongo()
app.use(express.json())
app.use(cors());  

app.use("/api/users",userController)
app.use("/api/ammuntion",ammuntionController)
  
httpServer.listen(PORT, () => {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
}); 
  