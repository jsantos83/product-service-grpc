import { ProductRepository } from "../../../domain/product/ports/product.repository";
import { Product } from "../../../domain/product/product.entity";

export class UpdateProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: number, input: { name?: string; description?: string; price?: number }) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error("Product not found");

    const updated = new Product(
      existing.id,
      input.name ?? existing.name,
      input.description ?? existing.description,
      input.price ?? existing.price
    );
    updated.validate();
    return await this.repo.update(updated);
  }
}
