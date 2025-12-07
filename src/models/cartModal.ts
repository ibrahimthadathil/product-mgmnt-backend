import mongoose, { Document, Schema } from "mongoose";
import { Iuser } from "./userModel";
import { Iproduct } from "./productModel";

export interface ICart extends Document {
  user: string | Iuser;
  items:[{product: string  | Iproduct,quantity:number}];
  created_at ?: Date  
}

const cartSchema = new Schema({
user:{type:mongoose.Schema.Types.ObjectId , ref :'User',required:true},
items:[{
    product:{type:mongoose.Schema.Types.ObjectId , ref :'Product',required:true},
    quantity:{type:Number,default:0}
}]
},{timestamps:true})

export const Cart = mongoose.model<ICart>('Cart',cartSchema)
