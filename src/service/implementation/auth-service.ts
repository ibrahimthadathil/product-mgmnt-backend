import { Iuser } from "@/models/userModel";
import { UserRepository } from "@/repository/implimentation/user/user-Repository";
import { comparePassword, hashPassword } from "@/utils/hash_utils";
import { Service } from "typedi";

@Service()
export class AuthService {
    constructor(
        private userRepository : UserRepository
    ){}
    
    async userSignUp (data:Iuser){
        try {
            console.log('hello');
            
           const existUser = await this.userRepository.findUserByEmail(data?.email) 
           if(existUser) return {message:'User Already exist'}
           const hashedPassword = await hashPassword(data.password)
           data.password = hashedPassword
           const addUser = await this.userRepository.create(data)
           if(addUser) return {success:true,message:'User Created'}
           else return {success:false, message:'failed to create'}
        } catch (error) {
            throw new Error('Failed to SignUp')
        }
    }

    async userSignIn(data:{email:string,password:string}){
        try {
            const existUser = await this.userRepository.findUserByEmail(data.email)
            if(!existUser) return {success:false,message:'Not registered'}
            const passwordCheck = await comparePassword(data.password,existUser.password)
            if(passwordCheck) return {success:true,message:'Logged In successfully'}
            else return { success: false, message:'Invalid credentials'}
        } catch (error) {
            throw new Error('failed to Sign In')
        }
    }

}