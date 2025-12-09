import { HttpStatus, responseMessage } from "@/enums/http_status_code";
import { ProductService } from "@/service/implementation/product/product-service";
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
        productData
      );
      if (success) res.status(HttpStatus.CREATED).json({ message, success });
      else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
    } catch (error) {
      console.log((error as Error).message);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: responseMessage.ERROR_MESSAGE });
    }
  }

  async getAllProduct(req: Request, res: Response) {
    try {
      const { success, data, message } =
        await this.product_service.getProducts();
      if (success) res.status(HttpStatus.OK).json({ message, success, data });
      else res.status(HttpStatus.NOT_FOUND).json({ message, success });
    } catch (error) {
      console.log((error as Error).message);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async editProduct(req: Request, res: Response) {
    try {
      const postId = req.params.id as string;
      const newImage = req.files as Express.Multer.File[];
      const { id, ...data } = req.body;       
      const { message, success } = await this.product_service.updateProduct(
        postId,
        data,
        newImage
      );
      if (success) res.status(HttpStatus.OK).json({ message, success });
      else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
    } catch (error) {
      console.log((error as Error).message);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async viewProduct(req:Request,res:Response){
    try {
      const productId = req.params.id as string
     const {success,data,message} = await this.product_service.getFullViewProduct(productId)
     if(success) res.status(HttpStatus.OK).json({success,data})
      else res.status(HttpStatus.NOT_FOUND).json({success,message})
    } catch (error) {
      console.log((error as Error).message);
       res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
  async deleteProduct (req:Request,res:Response){
    try {
      const productId = req.params.id
      const {message,success} = await this.product_service.deleteProductById(productId as string)
      if(success)res.status(HttpStatus.OK).json({success,message})
        else res.status(HttpStatus.BAD_REQUEST).json({success,message})
     } catch (error) {
      console.log((error as Error).message);
       res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: responseMessage.ERROR_MESSAGE });
    }
  }
}

export const Product_controller = Container.get(ProductController);
