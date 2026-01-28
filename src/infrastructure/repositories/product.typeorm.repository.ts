import { ProductRepository } from "../../domain/product/ports/product.repository";
import { Product } from "../../domain/product/product.entity";
import { AppDataSource } from "../db/data-source";
import { ProductTypeorm } from "../typeorm/entities/product.entity";
import { toDomain, toTypeorm } from "../../application/product/mappers/product.mapper";

export class ProductTypeormRepository implements ProductRepository {
  private repo = AppDataSource.getRepository(ProductTypeorm);

  async create(product: Product): Promise<Product> {
    const e = toTypeorm(product);
    const saved = await this.repo.save(e);
    return toDomain(saved);
  }

  async findById(id: number): Promise<Product | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? toDomain(found) : null;
  }

  async update(product: Product): Promise<Product> {
    const existing = await this.repo.findOneBy({ id: product.id! });
    if (!existing) {
      throw new Error("Product not found");
    }
    const toSave = toTypeorm(product);
    toSave.id = existing.id;
    const saved = await this.repo.save(toSave);
    return toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async list(limit = 10, offset = 0): Promise<{ data: Product[]; total: number }> {
    const [rows, total] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { id: "ASC" },
    });
    return { data: rows.map(toDomain), total };
  }
}
