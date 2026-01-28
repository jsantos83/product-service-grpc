import * as grpc from "@grpc/grpc-js";
import { AppDataSource } from "./infrastructure/db/data-source";
import { productService, productPackage } from "./infrastructure/grpc/product.controller";

async function bootstrap() {
  await AppDataSource.initialize();

  const server = new grpc.Server();

  server.addService(productPackage.ProductService.service, productService);

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("🚀 gRPC server running on port 50051");
      server.start();
    }
  );
}

bootstrap();
