import { MongoDocument } from "./common.types";
import { IProduct } from "./product.types";

export interface ILineItem {
  quantity: number;
  product: string | IProduct;
}

export interface IOrder extends MongoDocument {
  totalPrice: number;
  subtotalPrice: number;
  user: string;
  lineItems: ILineItem[];
}