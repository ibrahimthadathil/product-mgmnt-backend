import { BaseRepository } from "@/repository/implimentation/base-Repository";
import { Iproduct, Product } from "@/models/productModel";
import { Service } from "typedi";

@Service()
export class ProductRepository extends BaseRepository<Iproduct> {
  constructor() {
    super(Product);
  }
}
