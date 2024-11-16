import {Socket}from 'socket.io'
import Missile_List from '../models/MissileList'
import User from '../models/user'
import { statusMissile } from '../types/enum';

export const handelconnection = (client:Socket) =>{
    console.log("[Service] The connect for the Socket client very Goof");
    client.on("attackFire", async(dataMissile,dataUser)=>{
      const newMissile = {
        name:dataMissile.name,
        location:dataMissile.location,
        status:statusMissile.Hit
      }
        const newAttack = new Missile_List(newMissile)
        await newAttack.save();
        await User.findOneAndUpdate(
          { username:dataUser.name, "ammuntion.name": dataMissile.name }, 
          { $inc: { "ammuntion.amount": -1 } },
        )
     }   
    )
     client.on("defensiveFire", async(dataMissile,dataUser)=>{
        const missileList = await Missile_List.findOne({location:dataMissile.location, name:dataMissile.name}).lean();
      if(missileList){
      missileList.status = statusMissile.Intercepted
      }
      await User.findOneAndUpdate(
        { username:dataUser.name, "ammuntion.name": dataMissile.name }, 
        { $inc: { "ammuntion.amount": -1 } },
      )
     })
}