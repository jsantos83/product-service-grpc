import { Product } from "../product.entity";

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
  list(limit?: number, offset?: number): Promise<{ data: Product[]; total: number }>;
}
