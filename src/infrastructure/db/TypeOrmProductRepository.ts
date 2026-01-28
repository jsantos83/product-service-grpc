import { Repository } from "typeorm";
import { ProductRepository } from "../../domain/product/ProductRepository";
import { AppDataSource } from "./data-source";
import { ProductEntity } from "./ProductEntity";
import { Product } from "../../domain/product/Product";

export class TypeOrmProductRepository implements ProductRepository {
  private repo: Repository<ProductEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(ProductEntity);
  }

  async save(product: Product): Promise<Product> {
    const entity = this.repo.create(product as any);
    const saved = await this.repo.save(entity);

    // return new Product(
    //   saved.id,
    //   saved.name,
    //   saved.description,
    //   Number(saved.price)
    // );

    return new Product(
      1,'2','3',4
    );
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repo.find();
    return entities.map(
      p => new Product(p.id, p.name, p.description, Number(p.price))
    );
  }

  async findById(id: number): Promise<Product | null> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) return null;

    return new Product(
      entity.id,
      entity.name,
      entity.description,
      Number(entity.price)
    );
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
