import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IImage } from "@shared/types/shop.types";
import { IDevice } from "@shared/types/device.types";
import { EProductType, IProduct, ProductType } from "@shared/types/product.types";
import { HydratedDocument, SchemaTypes } from "mongoose";
import slugify from 'slugify';

@Schema()
class Image implements IImage {
  @Prop({ type: String, required: true })
  src: string;

  @Prop({ type: Number })
  width: number;

  @Prop({ type: Number })
  height: number;
}

@Schema({ timestamps: true })
export class Product implements IProduct {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Device',
    required: true
  })
  device: string | IDevice;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: String,
    enum: Object.keys(EProductType),
    required: true
  })
  productType: ProductType;

  @Prop([Image])
  images: IImage[];

  @Prop({ type: String })
  handle: string;

  @Prop({
    type: [{
      type: SchemaTypes.ObjectId,
      ref: 'Order'
    }], 
  })
  sales: string[];

  @Prop({ type: Number, default: 0 })
  totalSales: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  compareAtPrice: number;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', function(next) {
  this.handle = this.title.handleize();
  next();
});