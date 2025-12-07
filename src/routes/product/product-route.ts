import { Product_controller } from "@/controller/implementation/product/productController";
import { upload } from "@/utils/multer_utils";
import { Router } from "express";

export const productRoute = Router()

productRoute.route('/product')
.post(upload.array('images',3),Product_controller.addProduct.bind(Product_controller))