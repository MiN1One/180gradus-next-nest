import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IProduct } from "@shared/types/product.types";
import { Model } from "mongoose";
import { ApiFeatures } from "../utils/api.utils";
import { Product, ProductDocument } from "./product.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    readonly productModel: Model<ProductDocument>
  ) {}
 
  async getProducts(query: Record<string, string>) {
    try {
      const { mongooseQuery } = new ApiFeatures(
        this.productModel.find(), 
        query
      )
        .filter()
        .limit()
        .paginate()
        .project()
        .search()
        .sort();

      const products = await mongooseQuery;
      return products;
    } catch (er) {
      Logger.error('ProductService:getProducts');
      return [];
    } 
  }

  async getProduct(productId: string) {
    try {
      const product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException('Product with this id is not found');
      }
      return product;
    } catch (er) {
      Logger.error(er, 'ProductService:getProduct');
      return {};
    }
  }

  async updateProduct(productId: string, product: IProduct) {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        product,
        { new: true }
      );
      return updatedProduct;
    } catch (er) {
      Logger.error(er, 'ProductService:updateProduct');
      return {}
    }
  }

  async deleteProduct(productId: string) {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new NotFoundException('Product with this id is not found');
      }
    } catch (er) {
      Logger.error(er, 'ProductService:deleteProduct');
    }
    return null;
  }

  async createProduct(product: IProduct) {
    try {
      const createdProduct = await this.productModel.create(product);
      await createdProduct.save();
      return createdProduct;
    } catch (er) {
      Logger.error(er, 'ProductService:createProduct');
      return {};
    }
  }
}