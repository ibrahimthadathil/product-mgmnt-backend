import { Model, Document} from "mongoose";
import { Service } from "typedi";
import { IBaseRepository } from "@/repository/interface/base_interface";

@Service()
export abstract class BasRepository <T extends Document>implements IBaseRepository<T>{

    private model : Model<T>

    constructor(model : Model<T>){
        this.model  = model
    }

    async findAll(): Promise<T[]> {
        return this.model.find({},'-password')
    }

    async create(data: Partial<T>): Promise<T> { 
        return this.model.create(data)
    }
    
    async findById(id: string , populator?:string): Promise<T | null> {
        const query = this.model.findById(id)
        if(populator)query.populate(populator)
        return await query.exec()    //for ensure 
    }
    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id,data,{new:true})     
    }


    async delete(id: string): Promise<void | any> {
       return this.model.findByIdAndDelete(id)
    }
}