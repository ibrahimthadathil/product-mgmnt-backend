import Container, { Service } from "typedi";
import { IAuthController } from "../interface/authController";
import { AuthService } from "@/service/implementation/auth-service";
import { Request, Response } from "express";
import { HttpStatus, responseMessage } from "@/enums/http_status_code";
import { setCookie } from "@/utils/cookie_utils";

@Service()
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  async SignIn(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const { success, message, accessToken, refreshToken } =
        await this.authService.userSignIn(userData);
      if (success) {
        setCookie(res, "rftn", refreshToken as string);
        res.status(HttpStatus.OK).json({ message, success, accessToken });
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
      const { success, message, accessToken, refreshToken } =
        await this.authService.userSignUp(userData);
      if (success) {
        setCookie(res, "rftn", refreshToken as string);
        res.status(HttpStatus.CREATED).json({ message, success, accessToken });
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

   async setNewToken(req:Request,res:Response){
    const token=req.cookies?.rftn;
    if(!token){
        res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.ERROR_MESSAGE})
    }
    try {      
      const response= await this.authService.checkToken(token)
      if(response?.success){
        console.log(response.success,' after success');
        res.json({accessToken:response.accessToken})
        
      }else{
        res.clearCookie('rftn')
        res.status(HttpStatus.FORBIDDEN).json({message:response?.message})
      }
    } catch (error) {
        console.log('error in the setnew token',error);
        
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
