import  express  from "express";
import "dotenv/config"
import { connectToMongo } from "./config/db";
import userController from './controllers/user'
import ammuntionController from './controllers/ammuntion'




const PORT = process.env.PORT || 3000;

const app = express()


connectToMongo()
app.use(express.json())

app.use("/api/users",userController)
app.use("/api/ammuntion",ammuntionController)
  
  
 

  
  
app.listen(PORT,()=>{
    console.log(`Server is running, Visit "http://localhost:${PORT}"`);
})     
  