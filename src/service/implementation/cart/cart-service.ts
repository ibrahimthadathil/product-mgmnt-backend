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

        async updateCart(cartId:string,data:Partial<ICart>){
            try {
                const result = await this.cartRepo.update(cartId,data)
                if(result)return {success:true,message:'Cart updated'}
                else return {success:false,message:'Failed to update cart'}
            } catch (error) {
                throw error
            }
        }

        async deleteCart(cartId:string){
            try {
                const result = await this.cartRepo.delete(cartId)
                if(result)return {success:true,message:'Cart deleted'}
                else return {success:false,message:'Failed to delete cart'}
            } catch (error) {
                throw error
            }
        }

}