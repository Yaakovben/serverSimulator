import { Schema, Types, Document, model } from "mongoose";

export interface IUser extends Document {
    username:string
    password:string
    organition:string
    location?:string
    ammuntion:Types.ObjectId | null,
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        unique:true,
    },
    password:{ 
        type:String,
        unique:true
    },
    organition:{
        type:String,
    },
    location:{
        type:String,
    },
    ammuntion:{
        type:Schema.ObjectId,
        ref:"Missiled"
    }

})

export default model<IUser>("User",userSchema)