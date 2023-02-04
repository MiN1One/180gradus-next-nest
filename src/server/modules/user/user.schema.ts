import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IOrder } from "@shared/types/order.types";
import { EUserRole, IUser, UserRoleType } from "@shared/types/user.types";
import { HydratedDocument, SchemaTypes } from "mongoose";
import * as bcrypt from 'bcrypt';

export interface IUserMethods {
  checkPassword: (
    password: string, 
    candidatePassword: string
  ) => Promise<boolean>;
  passwordChanged: (tokenIssueTime: number) => boolean;
}

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ type: String, required: true })
  firstName: string;
  
  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, unique: true })
  email?: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phone: string;

  @Prop({ type: String })
  address?: string;

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

export type UserDocument = HydratedDocument<User & IUserMethods>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.checkPassword = function(
  password: string, 
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, password);
}

UserSchema.methods.passwordChanged = function(tokenIssueTime: number) {
  return (
    Boolean(this.passwordChangedAt) && 
    new Date(this.passwordChangedAt).getTime() > tokenIssueTime
  );
}

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 14);
  }
  next();
});