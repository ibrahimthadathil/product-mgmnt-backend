import { Service } from "typedi";
import { BaseRepository } from "../base-Repository";
import { Cart, ICart } from "@/models/cartModal";

@Service()
export class CartRepository extends BaseRepository<ICart> {
  constructor() {
    super(Cart);
  }

  async findByUser(userID: string) {
    try {
      return await Cart.findOne({ user: userID }).populate('items.product')
    } catch (error) {
      console.log((error as Error).message);
      throw error;
    }
  }

  async addItemToCart(
    userId: string,
    newCart:ICart
  ) {    
    try {
      
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        {
          $addToSet: {
            items: {
              product: newCart?.items[0].product,
              quantity: newCart?.items[0].quantity || 1,
            },
          },
        },
        { new: true, upsert: true }
      ).populate("items.product");    
      return cart;
    } catch (error) {
      console.log((error as Error).message);
      throw error
    }
  }

  async updateQuantity(userId: string,
    newCart:ICart){
    try {
      const cart = await Cart.findOneAndUpdate(
    {
      user: userId,
      "items.product": newCart?.items[0].product,
    },
    {
      $set: {
        "items.$.quantity": newCart?.items[0].quantity || 1,
      },
    },
    { new: true }
  )
  return true
    } catch (error) {
      console.log((error as Error).message);
      throw error
    }
  }

  async cartItemMatch (userId:string,productId:string){
    try {
        return await Cart.findOne({user:userId},{items:{$elemMatch:{product:productId}}})
    } catch (error) {
      console.log((error as Error).message);
        throw error
    }
  }

  async removeProductFromCart(userId: string, productId: string) {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { product: productId } } },
        { new: true }
      )
      
      return updatedCart;
    } catch (error) {
      console.log((error as Error).message);
      throw error;
    }
  }

}
