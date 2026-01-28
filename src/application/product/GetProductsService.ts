import { ProductRepository } from "../../domain/product/ports/product.repository";

export class GetProductsService {
  constructor(private repository: ProductRepository) {}

  execute(limit?: number, offset?: number) {
    return this.repository.list(limit, offset);
  }
}
