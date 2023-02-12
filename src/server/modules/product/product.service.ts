import { Injectable, Logger } from "@nestjs/common";
import { createDir } from "@server/utils/fs.utils";
import { LocaleRecord } from "@shared/types/locale.types";
import { IProduct } from "@shared/types/product.types";
import { writeFile } from "fs/promises";
import { join } from "path";
import { FactoryService } from "../factory/factory.service";

@Injectable()
export class ProductService {
  constructor(
    readonly factoryService: FactoryService
  ) {}
 
  getProducts(query: Record<string, string>) {
    return this.factoryService.getAllDocuments(query);
  }

  getProductsByIds(...ids: string[]) {
    return this.factoryService.getDocumentsByIds<IProduct[]>(...ids);
  }

  getProduct(productId: string) {
    return this.factoryService.getDocument(productId, 'device');
  }

  updateProduct(productId: string, product: IProduct) {
    if (product.title) {
      product['handle'] = product.title.handleize();
    }
    return this.factoryService.updateDocument(productId, product);
  }

  deleteProduct(productId: string) {
    return this.factoryService.deleteDocument(productId);
  }

  async saveTranslations(
    productHandle: string, 
    translations: LocaleRecord
  ) {
    try {
      const fileName = `${productHandle}.json`;
      const promises = Object.keys(translations).map(locale => {
        let translation = translations[locale];
        const filePath = join(process.cwd(), `/products/${locale}/`);
        const fileLocation = `${filePath}/${fileName}`;
        // const dirExists = createDir(fileLocation);
        return writeFile(fileLocation, JSON.stringify(translation));
      });
      await Promise.all(promises);
    } catch (er) {
      Logger.error(er, 'ProductService:saveTranslations');
    }
  }

  async createProduct(
    product: IProduct, 
    translations: LocaleRecord
  ) {
    await this.saveTranslations(
      product.title.handleize(), 
      translations
    );
    return this.factoryService.createDocument(product);
  }
}