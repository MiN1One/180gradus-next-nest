import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ILineItem, IOrder } from "@shared/types/order.types";
import { IProduct } from "@shared/types/product.types";
import { HydratedDocument, SchemaTypes } from "mongoose";

@Schema()
class LineItem implements ILineItem {
  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  product: string | IProduct;
}

@Schema({ timestamps: true })
export class Order implements IOrder {
  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Number, required: true })
  subtotalPrice: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: string;

  @Prop([LineItem])
  lineItems: string[] | ILineItem[];
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);