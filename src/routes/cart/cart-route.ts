import { cart_controller } from "@/controller/implementation/cart/cart-controller";
import { Router } from "express";


const cartRoute = Router()

cartRoute.route('/cart')
.post(cart_controller.addItemToCart.bind(cart_controller))

cartRoute.route('/cart/:id')
.put(cart_controller.updateCart.bind(cart_controller))
.delete(cart_controller.deleteCart.bind(cart_controller))

export default cartRoute