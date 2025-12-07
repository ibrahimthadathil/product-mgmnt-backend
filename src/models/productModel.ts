import mongoose ,{Schema,Document}from "mongoose";

export interface Iproduct extends Document{
    // _id?:string,
    images:string[],
    description:string,
    name:string,
    price:string;
    created_at?: Date
}

const productSchema = new Schema({
    name:{type:String, required:true},
    images:[{type:String ,required:true}],
    price:{type:String,required:true},
    description:{type:String},    
},{timestamps:true})

export const Product = mongoose.model<Iproduct>('Product',productSchema)