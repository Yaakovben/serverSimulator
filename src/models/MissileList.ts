import { Schema, Types, Document, model } from "mongoose";
import { statusMissile } from "../types/enum";


export interface IMissileList extends Document {
    username:string
    name:string
    location:string
    time:number
    status?:statusMissile
}

const MissileListSchema = new Schema<IMissileList>({
    username:{
        type:String
    },
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
   },
   time:{
    type:Number
   }
})
export default model<IMissileList>("Missile_List",MissileListSchema)    