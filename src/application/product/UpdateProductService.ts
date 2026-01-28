import { ProductRepository } from "../../domain/product/ports/product.repository";
import { Product } from "../../domain/product/product.entity";

export class UpdateProductService {
  constructor(private repository: ProductRepository) {}

  async execute(id: number, data: Partial<Product>) {
    const product = await this.repository.findById(id);
    if (!product) throw new Error("Product not found");

    product.name = data.name ?? product.name;
    product.description = data.description ?? product.description;
    product.price = data.price ?? product.price;

    product.validate();
    return this.repository.update(product);
  }
}
