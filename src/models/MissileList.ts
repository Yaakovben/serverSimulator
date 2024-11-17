import { Schema, Types, Document, model } from "mongoose";
import { statusMissile } from "../types/enum";


export interface IMissileList extends Document {
    name:string
    location:string
    status?:statusMissile
}

const MissileListSchema = new Schema<IMissileList>({
    name:{
        type:String, 
    },
   location:{
    type:String
   },
   status:{
    type:String,
    enum:statusMissile,
    default:statusMissile.Launched
   }
})
export default model<IMissileList>("Missile_List",MissileListSchema)    