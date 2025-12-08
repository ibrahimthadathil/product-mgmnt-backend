import { cart_controller } from "@/controller/implementation/cart/cart-controller";
import { Router } from "express";
import { authMiddleware } from "@/middleware/authMiddleware";


const cartRoute = Router()

cartRoute.route('/cart')
.post(authMiddleware, cart_controller.addItemToCart.bind(cart_controller))
.get(authMiddleware,cart_controller.getCartByUser.bind(cart_controller))
cartRoute.route('/cart/:id')
.put(authMiddleware, cart_controller.updateCart.bind(cart_controller))
.delete(authMiddleware, cart_controller.deleteCart.bind(cart_controller))

export default cartRoute