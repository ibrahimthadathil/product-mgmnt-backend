import { Iuser } from "@/models/userModal";
import { UserRepository } from "@/repository/implimentation/user-Repository";
import { hashPassword } from "@/utils/hash_utils";
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
            
        } catch (error) {
            
        }
    }

}