import { Product } from "./Product";

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  delete(id: number): Promise<void>;
}
