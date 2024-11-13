import { Schema, Types, Document, model } from "mongoose";

export interface IUser extends Document {
    username:string
    password:string
    organition:string
    location?:string
    ammuntion:[{name:String, amount:Number}]
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{ 
        type:String,
        required:true
    },
    organition:{
        type:String,
    },
    location:{
        type:String,
    },
    ammuntion:{
        type:[{name:String, amount:Number}]
    }
})

export default model<IUser>("User",userSchema)