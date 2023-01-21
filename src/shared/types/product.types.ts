import { IImage, MongoDocument } from "./common.types";
import { IDevice } from "./device.types";

export enum EProductType {
  SKIN = 'Skin',
  CASE = 'Case',
  GLASS = 'Protection glass'
}

export type ProductType = keyof typeof EProductType;

export interface IProduct extends MongoDocument {
  device: string | IDevice;
  productType: ProductType;
  images: IImage[];
  sales: string[];
  totalSales: number;
  price: number;
  compareAtPrice: number;
  isActive: boolean;
}