import { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, verifyToken } from "@/utils/jwt_utils";
import { Service } from "typedi";

@Service()
export class tokenService {

    generate_AccessToken(payload:JwtPayload){
        return generateAccessToken(payload)
    }

    verify_Token(token:string):JwtPayload{
        return verifyToken(token) as JwtPayload
    }
    
}