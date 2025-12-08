import { ICart } from "@/models/cartModal";
import { CartRepository } from "@/repository/implimentation/cart/cart-repository";
import { Service } from "typedi";

@Service()
export class CartService {
  constructor(private cartRepo: CartRepository) {}
  async getAllCart(userId:string){
    try {
      const data = await this.cartRepo.findByUser(userId)
       return {success:true,data:data ?? []}
    } catch (error) {
      throw error
    }
  }
  async addToCart(userId: string, data: ICart) {
    try {
      const checkCart = await this.cartRepo.cartItemMatch(
        userId,
        data?.items[0]?.product as string
      );
      if (checkCart?.items?.length) return { success: true, message: "Already added" };
      const result = await this.cartRepo.addItemToCart(userId, data);
      if (result) return { success: true, message: "Added to Cart" };
      else return { success: false, message: "Failed to add cart" };
    } catch (error) {
      console.log((error as Error).message);

      throw error;
    }
  }

  async updateCart(cartId: string, data: Partial<ICart>) {
    try {
      const result = await this.cartRepo.update(cartId, data);
      if (result) return { success: true, message: "Cart updated" };
      else return { success: false, message: "Failed to update cart" };
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(userId: string, productId: string) {
    try {
      // Check if product exists in cart
      const cartItem = await this.cartRepo.cartItemMatch(userId, productId);
      if (!cartItem) {
        return { success: false, message: "Product not found in cart" };
      }
      const result = await this.cartRepo.removeProductFromCart(userId, productId);
      if (result) return { success: true, message: "Product removed from cart" };
      else return { success: false, message: "Failed to remove product from cart" };
    } catch (error) {
      throw error;
    }
  }
}
