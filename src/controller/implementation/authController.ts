import Container, { Service } from "typedi";
import { IAuthController } from "../interface/authController";
import { AuthService } from "@/service/implementation/auth-service";
import { Request, Response } from "express";
import { HttpStatus, responseMessage } from "@/enums/http_status_code";

@Service()
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  async SignIn(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body
      const {success,message} = await this.authService.userSignIn(userData)
      if(success) res.status(HttpStatus.OK).json({message,success})
        else res.status(HttpStatus.BAD_REQUEST).json({message,success})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        response: responseMessage.ERROR_MESSAGE,
        error: (error as Error).message,
      });
    }
  }

  async Signup(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      console.log(userData);
      const { success, message } = await this.authService.userSignUp(userData);
      if (success) res.status(HttpStatus.CREATED).json({ message, success });
      else
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message, success });
    } catch (error) {
        console.log('@',error);
        
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        response: responseMessage.ERROR_MESSAGE,
        error: (error as Error).message,
      });
    }
  }
}

export const auth_Controller = Container.get(AuthController);
