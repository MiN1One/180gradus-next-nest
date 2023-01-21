import { Module } from "@nestjs/common";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FactoryModule } from "../factory/factory.module";
import { ProductController } from "./product.controller";
import { Product, ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<any>) => ({ model }),
      inject: [getModelToken(Product.name)],
      imports: [
        MongooseModule.forFeature([{
          name: Product.name,
          schema: ProductSchema  
        }])
      ]
    }),
  ]
})
export class ProductModule {}