import { cart_controller } from "@/controller/implementation/cart/cart-controller";
import { Router } from "express";


const cartRoute = Router()

cartRoute.route('/cart')
.post(cart_controller.addItemToCart.bind(cart_controller))

export default cartRoute