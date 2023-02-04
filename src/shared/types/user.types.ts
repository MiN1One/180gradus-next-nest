import { MongoDocument } from "./common.types";
import { IOrder } from "./order.types";

export enum EUserRole {
  ADMIN = 'Admin',
  USER = 'User',
  MAINTAINER = 'Maintainer',
  MERCHANT = 'Merchant'
}

export type UserRoleType = keyof typeof EUserRole;

export interface IUser extends MongoDocument {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  username: string;
  address?: string;
  address2?: string;
  city?: string;
  role?: UserRoleType;
  isActive?: boolean;
  orders?: string[] | IOrder[];
  password?: string;
  passwordChangedAt?: string;
  passwordResetExpiresIn?: string;
  passwordResetToken?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}