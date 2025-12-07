import { Iuser } from "@/models/userModel";
import { UserRepository } from "@/repository/implimentation/user/user-Repository";
import { comparePassword, hashPassword } from "@/utils/hash_utils";
import { Service } from "typedi";
import { tokenService } from "./jwt-service/jwt-service";
import { JsonWebTokenError } from "jsonwebtoken";

@Service()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: tokenService
  ) {}

  async userSignUp(data: Iuser) {
    try {
      const existUser = await this.userRepository.findUserByEmail(data?.email);
      if (existUser) return { message: "User Already exist" };
      const hashedPassword = await hashPassword(data.password);
      data.password = hashedPassword;
      const addUser = await this.userRepository.create(data);
      if (addUser) {
        const accessToken = this.tokenService.generate_AccessToken({
          id: addUser.id,
          email: addUser.email,
        });
        const refreshToken = this.tokenService.generate_RefreshToken({
          id: addUser.id,
          email: addUser.email,
        });
        return {
          success: true,
          message: "User Created",
          accessToken,
          refreshToken,
        };
      } else return { success: false, message: "failed to create" };
    } catch (error) {
      throw new Error("Failed to SignUp");
    }
  }

  async userSignIn(data: { email: string; password: string }) {
    try {
      const existUser = await this.userRepository.findUserByEmail(data.email);
      if (!existUser) return { success: false, message: "Not registered" };
      const passwordCheck = await comparePassword(
        data.password,
        existUser.password
      );
      if (passwordCheck) {
        const accessToken = this.tokenService.generate_AccessToken({
          id: existUser.id,
          email: existUser.email,
        });
        const refreshToken = this.tokenService.generate_RefreshToken({
          id: existUser.id,
          email: existUser.email,
        });
        return {
          success: true,
          message: "Logged In successfully",
          accessToken,
          refreshToken,
        };
      } else return { success: false, message: "Invalid credentials" };
    } catch (error) {
      throw new Error("failed to Sign In");
    }
  }

  async checkToken(token:string){
    try {
     const response = this.tokenService.verify_Token(token)
     if(typeof response === 'object' && response !== null && 'id' in response){
      const newAccessToken = this.tokenService.generate_AccessToken({email:response.email,id:response.id})
      return {success:true,message:"new token created",accessToken:newAccessToken}
     }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return {success:false,message:"Refresh token expired, please log in again"}
     }
     console.error("Error verifying refresh token:", error);
    }
  }
}
