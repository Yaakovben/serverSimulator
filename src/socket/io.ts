import {io} from '../app'
import {Socket}from 'socket.io'
import Missile_List from '../models/MissileList'
import { statusMissile } from '../types/enum';


export const handelconnection = (client:Socket) =>{
    console.log("[Service] The connect for the Socket client very Goof");
    client.on("attackFire", async(data)=>{
        const newAttack = new Missile_List(data)
        return await newAttack.save();
     })
     client.on("defensiveFire", async(data)=>{
        const missileList = await Missile_List.findOne({location:data.location, name:data.name}).lean();
      if(missileList){
      missileList.status = statusMissile.Intercepted
      }
     })
    
}