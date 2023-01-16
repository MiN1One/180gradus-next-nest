import { IImage, MongoDocument } from "./common.types";
import { IProduct } from "./product.types";

export enum EDeviceType {
  PHONE = 'Phone',
  CONSOLE = 'Console',
  LAPTOP = 'Laptop'
}

export type DeviceType = keyof typeof EDeviceType;

export interface IDevice extends MongoDocument {
  deviceType: DeviceType;
  isActive: boolean;
  tags: string[];
  products: string[] | IProduct[];
  image: IImage;
  name: string;
  vendor?: string;
}