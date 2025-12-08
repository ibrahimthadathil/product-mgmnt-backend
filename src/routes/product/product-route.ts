import { Product_controller } from "@/controller/implementation/product/productController";
import { upload } from "@/utils/multer_utils";
import { Router } from "express";
import { authMiddleware } from "@/middleware/authMiddleware";
import { requireRole } from "@/middleware/roleMiddleware";

export const productRoute = Router()

productRoute.route('/product')
.post(authMiddleware, requireRole(['admin']), upload.array('images',3),Product_controller.addProduct.bind(Product_controller))
.get(Product_controller.getAllProduct.bind(Product_controller))
productRoute.route('/product/:id')
.get(Product_controller.viewProduct.bind(Product_controller))
.put(authMiddleware, requireRole(['admin']), upload.array('images',3),Product_controller.editProduct.bind(Product_controller))
.delete(authMiddleware, requireRole(['admin']),Product_controller.deleteProduct.bind(Product_controller))