import { Product_controller } from "@/controller/implementation/product/productController";
import { upload } from "@/utils/multer_utils";
import { Router } from "express";

export const productRoute = Router()

productRoute.route('/product')
.post(upload.array('images',3),Product_controller.addProduct.bind(Product_controller))
.get(Product_controller.getAllProduct.bind(Product_controller))
productRoute.route('/product/:id')
.put(upload.array('images',3),Product_controller.editProduct.bind(Product_controller))
.delete(Product_controller.deleteProduct.bind(Product_controller))