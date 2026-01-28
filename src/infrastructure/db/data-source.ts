import "reflect-metadata";
import { DataSource } from "typeorm";
// import { ProductEntity } from "./ProductEntity";
import dotenv from "dotenv";
import { ProductTypeorm } from "../typeorm/entities/product.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // solo desarrollo
  logging: true,
  entities: [ProductTypeorm],
});
