import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IOrder } from "@shared/types/order.types";
import { EUserRole, IUser, UserRoleType } from "@shared/types/user.types";
import { HydratedDocument, SchemaTypes } from "mongoose";

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ type: String, required: true })
  firstName: string;
  
  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String })
  address2?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({
    type: String,
    enum: Object.keys(EUserRole),
    default: 'USER'
  })
  role: UserRoleType;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({
    type: [{
      type: SchemaTypes.ObjectId,
      ref: 'Order'
    }]
  })
  orders: string[] | IOrder[];

  @Prop({ type: String, required: true, select: false })
  password?: string;

  @Prop({ type: String })
  passwordChangedAt?: string;

  @Prop({ type: String })
  passwordResetExpiresIn?: string;

  @Prop({ type: String })
  passwordResetToken?: string;

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: Boolean, default: false })
  phoneVerified: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);