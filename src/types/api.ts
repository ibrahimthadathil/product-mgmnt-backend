import { Iproduct } from "@/models/productModel";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

 export interface AuthRequest extends Request {
  user?: JwtPayload & {
    id: string;
    email: string;
    role: 'admin' | 'user';
  };
}


export interface UpdateProductPayload extends Partial<Iproduct> {
    existingImages?: string; 
}
