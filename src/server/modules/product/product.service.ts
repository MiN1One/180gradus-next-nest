import { Injectable } from "@nestjs/common";
import { IProduct } from "@shared/types/product.types";
import { FactoryService } from "../factory/factory.service";

@Injectable()
export class ProductService {
  constructor(
    readonly factoryService: FactoryService
  ) {}
 
  getProducts(query: Record<string, string>) {
    return this.factoryService.getAllDocuments(query);
  }

  getProduct(productId: string) {
    return this.factoryService.getDocument(productId, 'device');
  }

  updateProduct(productId: string, product: IProduct) {
    return this.factoryService.updateDocument(productId, product);
  }

  deleteProduct(productId: string) {
    return this.factoryService.deleteDocument(productId);
  }

  createProduct(product: IProduct) {
    return this.factoryService.createDocument(product);
  }
}