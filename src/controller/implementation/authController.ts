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
      const userData = req.body;
      const { success, user ,message, accessToken } =
        await this.authService.userSignIn(userData);
      if (success) {
        res.status(HttpStatus.OK).json({ message, success, accessToken,user });
      } else res.status(HttpStatus.BAD_REQUEST).json({ message, success });
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
      
      const { success, message, accessToken, user } =
        await this.authService.userSignUp(userData);
      if (success) {
        res.status(HttpStatus.CREATED).json({ message, success, accessToken,user });
      } else
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message, success });
    } catch (error) {
      console.log("@", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        response: responseMessage.ERROR_MESSAGE,
        error: (error as Error).message,
      });
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      res.clearCookie("rftn");
      res.status(HttpStatus.OK).json({ message: "logged Out" });
    } catch (error) {
      console.log((error as Error).message);
      throw new Error("from logout user");
    }
  }
}

export const auth_Controller = Container.get(AuthController);
