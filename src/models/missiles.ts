import { Schema, Types, Document, model } from "mongoose";

export interface IMissiles extends Document{
    name:string
    resources:[{
        name:string
        amount:number
    }],
    budget:number
}

const missiledSchema = new Schema<IMissiles>({
    name:{
        type:String
    },
    resources:{
        
    },
    budget:{
        type:Number
    }

})

export default model<IMissiles>("Missiled",missiledSchema)