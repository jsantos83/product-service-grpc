import { ProductRepository } from "../../../domain/product/ports/product.repository";

export class DeleteProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: number) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error("Product not found");
    await this.repo.delete(id);
  }
}
