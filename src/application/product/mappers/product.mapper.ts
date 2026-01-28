import { Product } from "../../../domain/product/product.entity";
import { ProductTypeorm } from "../../../infrastructure/typeorm/entities/product.entity";

export const toDomain = (e: ProductTypeorm): Product => {
  return new Product(e.id, e.name, e.description ?? null, Number(e.price));
};

export const toTypeorm = (p: Product): ProductTypeorm => {
  const e = new ProductTypeorm();
  if (p.id) e.id = p.id;
  e.name = p.name;
  e.description = p.description ?? null;
  e.price = p.price.toFixed(2);
  return e;
};
