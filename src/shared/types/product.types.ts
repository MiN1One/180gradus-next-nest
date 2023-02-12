import { MongoDocument } from "./common.types";
import { IImage } from "@shared/types/settings.types";
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
  title: string;
  handle: string;
  totalSales: number;
  price: number;
  compareAtPrice: number;
  description: string;
  isActive: boolean;
}