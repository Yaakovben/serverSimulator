import  express  from "express";
import "dotenv/config"


const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.json())

app.use("/api/users",()=>{})
app.use("/api/ammuntion",()=>{})

  
 


  
app.listen(PORT,()=>{
    console.log(`Server is running, Visit "http://localhost:${PORT}"`);
})     
  