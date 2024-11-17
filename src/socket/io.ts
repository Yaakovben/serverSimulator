import {Socket}from 'socket.io'
import Missile_List from '../models/MissileList'
import User from '../models/user'
import { statusMissile } from '../types/enum';

export const handelconnection = async (client:Socket) =>{
    console.log(`[Service] The connect for the Socket client very Goof"${client.id}`);
    client.on("start",async()=>{
      const missileListToClient = await Missile_List.find({}).lean();
      client.emit("listMissiles",missileListToClient)})
      client.on("attackFire", async(missileName,locationMissile,userName)=>{
      const newMissile = {
        name:missileName,
        location:locationMissile,
        time:10,
        status:statusMissile.Hit
      }
        const newAttack = new Missile_List(newMissile)
        await newAttack.save();
        await User.findOneAndUpdate(
          { username:userName, "ammuntion.name": missileName }, 
          { $inc: { "ammuntion.$.amount": -1 } },
        )
        const updateMissileListToClient =await Missile_List.find({}).lean();
        client.emit("updatelistMissiles",updateMissileListToClient)
     }   
    )
     client.on("defensiveFire", async(missileLocation,missileName,userName)=>{
        const missileList = await Missile_List.findOne({location:missileLocation, name:missileName})
      if(missileList){
      missileList.status = statusMissile.Intercepted
      missileList.save()
      }
      await User.findOneAndUpdate(
        { username:userName, "ammuntion.name": missileName }, 
        { $inc: { "ammuntion.amount": -1 }},
      )
      const updatedMissileList = await Missile_List.find({}).lean();
      client.emit("updatelistMissiles", updatedMissileList);
      
     })
}