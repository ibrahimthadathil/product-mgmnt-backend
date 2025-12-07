import { Service } from "typedi";
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";

@Service()
export class s3Service  { 
  private s3Service: S3Client;
  constructor() {
    this.s3Service = new S3Client({
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY || "",
        secretAccessKey: process.env.BUCKET_SECRET_KEY || "",
      },
      region: process.env.BUCKET_REGION || "",
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 300000, // Set connection timeout (5 minutes)
        socketTimeout: 300000, // Set socket timeout (5 minutes)
      }),
    });
  }
  private validate_Files(file: Express.Multer.File) {
    if (file.size > 2 * 1024 * 1024)
      throw new Error("File size too large. Maximum size is 2MB");
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.mimetype))
      throw new Error("Only image files are allowed");
  }
  async upload_File(
    file: Express.Multer.File | Express.Multer.File[],
    folder: string
  ) {
    try {
      const images = Array.isArray(file) ? file : [file];
      images.forEach((img) => this.validate_Files(img));
      const results = await Promise.all(
        images.map(async (img) => {
          const randomString = `LBP${Math.floor(100 + Math.random() * 900)}`;
          const extension = img.originalname.split(".").pop(); // Keep original file extension
          const fileName = `${randomString}.${extension}`;
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${folder}/${Date.now()}-${fileName}`,
            Body: img.buffer,
            ContentType: img.mimetype,
          };

          const command = new PutObjectCommand(params);
          await this.s3Service.send(command)
          return {
            success: true,
            Location: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${params.Key}`,
          };
        })
      );
      return Array.isArray(file) ? results : results[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async delete_File(files: string[]) {
    try {
      for (let url of files) {
        let key = url.split(".com/")[1];
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
        };
        const command = new DeleteObjectCommand(params);
        try {
          await this.s3Service.send(command);
        } catch (sendError) {
          throw new Error("Faield to delete");
        }
      }
      return true;
    } catch (error) {
      throw new Error("Error occured in delete file");
    }
  }
}