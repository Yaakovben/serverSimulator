import {io} from '../app'
import {Socket}from 'socket.io'
import Ammuntion from '../models/Ammuntion';

export const handelconnection = (client:Socket) =>{
    console.log("[Service] The connect for the Socket client very Goof");
    client.on("attackFire", async(data)=>{
        const newAttack = new Ammuntion(data)
        return await newAttack.save();
     })
     client.on("defensiveFire",(data)=>{
        
     })
    
}