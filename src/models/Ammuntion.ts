import { Schema, Types, Document, model } from "mongoose";

export interface IMissiles extends Document{
    name:string
    resources:[{
        name:string
        amount:number
    }],
    budget:number
}

const ammuntionSchema = new Schema<IMissiles>({
    name:{
        type:String
    },
    resources:{
        type:[{name:String, amount:Number}]
        
    },
    budget:{    
        type:Number
    }

})

export default model<IMissiles>("Ammuntion",ammuntionSchema)