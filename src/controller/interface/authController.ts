import { Request, Response } from "express";


export interface IAuthController {
    Signup(req: Request, res: Response): Promise<void>;
    SignIn(req:Request, res:Response): Promise<void>
  }
  