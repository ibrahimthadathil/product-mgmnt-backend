import { Iproduct } from "@/models/productModel";
import { ProductRepository } from "@/repository/implimentation/product/product-repository";
import { Service } from "typedi";
import { s3Service } from "@/service/implementation/S3-service/image-upload-service";
import { UpdateProductPayload } from "@/types/api";

@Service()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private S3Service: s3Service
  ) {}

  async addNewProduct(files: Express.Multer.File[], data: Partial<Iproduct>) {
    try {
      const response = await this.S3Service.upload_File(files, "product");
      if (Array.isArray(response)) {
        const imageLInks = response.map((file) => file.Location);
        const newProduct = { ...data, images: imageLInks } as Iproduct;
        const createPost = await this.productRepository.create(newProduct);
        if (createPost) return { message: "Product Added", success: true };
        else return { success: false, message: "failed to create product" };
      } else throw new Error("Error in image upload");
    } catch (error) {
      console.log((error as Error).message, "ppppp");

      return { success: false, message: (error as Error).message };
    }
  }

  async getProducts() {
    try {
      const result = await this.productRepository.findAll();
      if (result) return { success: true, data: result };
      else return { success: false, message: "Failed to fetch" };
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(
    id: string,
    data: UpdateProductPayload,
    newImages?: Express.Multer.File[]
  ) {
    try {
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        return {
          success: false,
          message: "Product not found",
        };
      }

      const currentImagesInDB = existingProduct.images || [];
      const retainedImageUrls = data.existingImages
        ? data.existingImages
            .split(",")
            .filter((img) => img.trim())
            .map((img) => img.trim())
        : [];

      const imagesToDelete = currentImagesInDB.filter(
        (dbImage: string) => !retainedImageUrls.includes(dbImage)
      )

      if (imagesToDelete.length > 0) {
        await this.S3Service.delete_File(imagesToDelete);
      }

      const newImageUrls: string[] = [];
      if (newImages && newImages.length > 0) {
        const uploadResponse = await this.S3Service.upload_File(
          newImages,
          "product"
        );

        if (Array.isArray(uploadResponse)) {
          uploadResponse.forEach((file) => {
            if (file.Location) {
              newImageUrls.push(file.Location);
            }
          });
        } else {
          throw new Error("Failed to upload images, try later");
        }
      }

      const finalImages = [...retainedImageUrls, ...newImageUrls];

      if (finalImages.length === 0) {
        return {
          success: false,
          message: "Product must have at least one image",
        };
      }

      const updatePayload: Partial<Iproduct> = {
        images: finalImages,
      };

      if (data.name) updatePayload.name = data.name;
      if (data.category) updatePayload.category = data.category;
      if (data.price) updatePayload.price = data.price;
      if (data.description) updatePayload.description = data.description;

      const updatedProduct = await this.productRepository.update(
        id,
        updatePayload
      );

      if (updatedProduct) {
        return {
          success: true,
          message: "Product updated successfully",
          data: updatedProduct,
        };
      } else {
        throw new Error("Failed to update product in database");
      }
    } catch (error) {
      console.error("Update product error:", (error as Error).message);
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async deleteProductById(productId: string) {
    try {
      const checkPRoduct = await this.productRepository.findById(productId);
      if (checkPRoduct) {
        const deleted = await this.productRepository.delete(productId);
        if (deleted) return { success: true, message: "Product Deleted" };
        else throw new Error("Bad Request");
      } else throw new Error("Bad request");
    } catch (error) {
      throw error;
    }
  }
}
