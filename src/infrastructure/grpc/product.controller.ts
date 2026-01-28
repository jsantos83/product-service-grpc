import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

import { GetProductsService } from "../../application/product/GetProductsService";
import { CreateProductService } from "../../application/product/CreateProductService";
import { UpdateProductService } from "../../application/product/UpdateProductService";
import { DeleteProductService } from "../../application/product/DeleteProductService";
import { ProductTypeormRepository } from "../repositories/product.typeorm.repository";

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "../../../proto/product.proto")
);

const grpcObj = grpc.loadPackageDefinition(packageDef) as any;
const productPackage = grpcObj.product;

// const repository = new TypeOrmProductRepository();
const repository = new ProductTypeormRepository();

export const productService = {
  CreateProduct: async (call: any, callback: any) => {
    const service = new CreateProductService(repository);
    const product = await service.execute(call.request);
    callback(null, { product });
  },

  ListProducts: async (call: any, callback: any) => {
    const service = new GetProductsService(repository);
    const result = await service.execute(call.request.limit, call.request.offset);
    callback(null, result);
  },

  UpdateProduct: async (call: any, callback: any) => {
    const service = new UpdateProductService(repository);
    const product = await service.execute(call.request.id, call.request);
    callback(null, { product });
  },

  DeleteProduct: async (call: any, callback: any) => {
    const service = new DeleteProductService(repository);
    await service.execute(call.request.id);
    callback(null, {});
  }
};

export { productPackage };
