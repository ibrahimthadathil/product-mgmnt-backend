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
      return await Cart.findOne({ user: userID });
    } catch (error) {
      throw error;
    }
  }

  async addItemToCart(
    userId: string,
    newCart:ICart
  ) {
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
  }

  async cartItemMatch (userId:string,productId:string){
    try {
        return await Cart.findOne({user:userId},{items:{$elemMatch:{product:productId}}})
    } catch (error) {
        throw error
    }
  }

}
