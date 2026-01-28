import { ProductRepository } from "../../../domain/product/ports/product.repository";

export class ListProductsUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(limit = 10, offset = 0) {
    return await this.repo.list(limit, offset);
  }
}
