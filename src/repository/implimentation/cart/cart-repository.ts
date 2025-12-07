import { Service } from "typedi";
import { BaseRepository } from "../base-Repository";
import { Cart, ICart } from "@/models/cartModal";

@Service()
export  class CartRepository extends BaseRepository<ICart>{
    constructor(){
        super(Cart)
    }
    
}