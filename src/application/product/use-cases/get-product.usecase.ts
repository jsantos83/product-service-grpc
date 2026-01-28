import { ProductRepository } from "../../../domain/product/ports/product.repository";

export class GetProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: number) {
    const p = await this.repo.findById(id);
    if (!p) throw new Error("Product not found");
    return p;
  }
}
