import { Product } from "../../../domain/product/product.entity";
import { ProductRepository } from "../../../domain/product/ports/product.repository";

export class CreateProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(input: { name: string; description?: string; price: number }): Promise<Product> {
    const product = new Product(null, input.name, input.description ?? null, input.price);
    product.validate();
    return await this.repo.create(product);
  }
}
