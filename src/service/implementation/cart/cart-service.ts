import { ICart } from "@/models/cartModal";
import { CartRepository } from "@/repository/implimentation/cart/cart-repository";
import { Service } from "typedi";

@Service()
export class CartService{
        constructor(
            private cartRepo : CartRepository
        ){}

        async addToCart(userId:string,data:Partial<ICart>){
            try {
                const result = await this.cartRepo.create({user:userId,...data})
                if(result)return {success:true,message:'added to cart'}
                else return {success:false,message:'Failed to add cart'}
            } catch (error) {
                throw error
            }
        }

}