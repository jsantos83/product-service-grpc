import { ProductRepository } from "../../domain/product/ports/product.repository";

export class DeleteProductService {
  constructor(private repository: ProductRepository) {}

  async execute(id: number) {
    await this.repository.delete(id);
  }
}
