import { HttpStatus, responseMessage } from "@/enums/http_status_code";
import { ProductService } from "@/service/implementation/product/product-service";
import { AuthRequest } from "@/types/api";
import { Request, Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class ProductController {
  constructor(private product_service: ProductService) {}
  async addProduct(req: Request, res: Response) {
    try {
      const images = req.files as Express.Multer.File[];
      const productData = req.body;
      const { message, success } = await this.product_service.addNewProduct(
        images,
        productData,
      );
      if (success) res.status(HttpStatus.CREATED).json({ message, success });
      else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: responseMessage.ERROR_MESSAGE });
    }
  }


}

export const Product_controller = Container.get(ProductController);
