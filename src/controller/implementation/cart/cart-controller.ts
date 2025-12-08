import { HttpStatus, responseMessage } from "@/enums/http_status_code";
import { CartService } from "@/service/implementation/cart/cart-service";
import { AuthRequest } from "@/types/api";
import { Request, Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class CartController {
  constructor(private cartservice: CartService) {}
  async addItemToCart(req: AuthRequest, res: Response) {
    try {
      
      if (req.user) {
        const newCart = req.body;
        const { message, success } = await this.cartservice.addToCart(
          req.user.id,
          newCart
        );
        if (success) res.status(HttpStatus.CREATED).json({ message, success });
        else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
      } else
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: responseMessage.TOKEN_ACCESS,
          success: false,
        });
    } catch (error) {
      console.log((error as Error).message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        response: responseMessage.ERROR_MESSAGE,
        error: (error as Error).message,
      });
    }
  }

  async updateCart(req: AuthRequest, res: Response) {
    try {
      if (req.user) {
        const cartId = req.params.id as string;
        const updateData = req.body;
        const { message, success } = await this.cartservice.updateCart(
          cartId,
          updateData
        );
        if (success) res.status(HttpStatus.OK).json({ message, success });
        else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
      } else
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: responseMessage.TOKEN_ACCESS,
          success: false,
        });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        response: responseMessage.ERROR_MESSAGE,
        error: (error as Error).message,
      });
    }
  }

  async deleteCart(req: AuthRequest, res: Response) {
    try {
      if (req.user) {
        const cartId = req.params.id as string;
        const { message, success } = await this.cartservice.deleteCart(cartId);
        if (success) res.status(HttpStatus.OK).json({ message, success });
        else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
      } else
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: responseMessage.TOKEN_ACCESS,
          success: false,
        });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        response: responseMessage.ERROR_MESSAGE,
        error: (error as Error).message,
      });
    }
  }
}

export const cart_controller = Container.get(CartController);
