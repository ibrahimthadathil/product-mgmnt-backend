import { Iproduct } from "@/models/productModel";
import { ProductRepository } from "@/repository/implimentation/product/product-repository";
import { Service } from "typedi";
import { s3Service } from "@/service/implementation/S3-service/image-upload-service";

@Service()
export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        private S3Service : s3Service
    ){}

    async addNewProduct(files:Express.Multer.File[],data:Partial<Iproduct>){
        try {
            const response = await this.S3Service.upload_File(files,'product')
            if(Array.isArray(response)){
                const imageLInks = response.map((file)=>file.Location)
                const newProduct = {...data,images:imageLInks,} as Iproduct
                const createPost = await this.productRepository.create(newProduct)
                if(createPost)return {message:'Product Added',success:true}
                else return { success:false,message:'failed to create product' }
            }else throw new Error('Error in image upload')
        } catch (error) {
            return {success:false,message:(error as Error).message} 
        }
    }

}