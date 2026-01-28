import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string|null;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: string;
}
