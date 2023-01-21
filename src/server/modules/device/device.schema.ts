import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IImage } from "@shared/types/common.types";
import { DeviceType, EDeviceType, IDevice } from "@shared/types/device.types";
import { IProduct } from "@shared/types/product.types";
import { HydratedDocument, SchemaTypes } from "mongoose";

@Schema()
class ImageSchema implements IImage {
  @Prop({ type: String, required: true })
  src: string;

  @Prop({ type: String, default: 'Device Image' })
  alt?: string;
}

@Schema({ timestamps: true })
export class Device implements IDevice {
  @Prop({
    type: String,
    enum: Object.keys(EDeviceType),
    required: true,
  })
  deviceType: DeviceType;

  @Prop({
    type: String,
    required: true,
    index: 'text',
    unique: true,
  })
  name: string;

  @Prop({ type: String })
  vendor: string;

  @Prop({ type: ImageSchema, required: true })
  image: IImage;

  @Prop({
    type: [{
      type: SchemaTypes.ObjectId,
      ref: 'Product'
    }] 
  })
  products: string[] | IProduct[];

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop([String])
  tags: string[];
}

export type DeviceDocument = HydratedDocument<Device>;
export const DeviceSchema = SchemaFactory.createForClass(Device);