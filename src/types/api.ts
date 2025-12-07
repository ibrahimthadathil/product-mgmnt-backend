import { Iproduct } from "@/models/productModel";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: string;
}

export interface UpdateProductPayload extends Partial<Iproduct> {
    existingImages?: string; 
}
