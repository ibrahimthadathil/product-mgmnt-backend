import { ICart } from "@/models/cartModal";
import { CartRepository } from "@/repository/implimentation/cart/cart-repository";
import { Service } from "typedi";

@Service()
export class CartService {
  constructor(private cartRepo: CartRepository) {}

  async addToCart(userId: string, data: ICart) {
    try {
      const checkCart = await this.cartRepo.cartItemMatch(
        userId,
        data?.items[0]?.product as string
      );
      if (checkCart) return { success: true, message: "Already added" };
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

  async deleteCart(cartId: string) {
    try {
      const result = await this.cartRepo.delete(cartId);
      if (result) return { success: true, message: "Cart deleted" };
      else return { success: false, message: "Failed to delete cart" };
    } catch (error) {
      throw error;
    }
  }
}
