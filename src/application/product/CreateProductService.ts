import { ProductRepository } from "../../domain/product/ports/product.repository";
import { Product } from "../../domain/product/product.entity";

export class CreateProductService {
  constructor(private repository: ProductRepository) {}

  async execute(data: {
    name: string;
    description?: string;
    price: number;
  }) {
    const product = new Product(
      null,
      data.name,
      data.description ?? null,
      data.price
    );

    product.validate();
    return this.repository.create(product);
  }
}
