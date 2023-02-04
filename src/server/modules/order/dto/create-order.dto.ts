import { ILineItem, IOrder } from "@shared/types/order.types";
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class LineItem implements ILineItem {
  @IsNumber()
  quantity: number;

  @IsString()
  product: string;
}

export class CreateOrderDto implements Partial<IOrder> {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => LineItem)
  lineItems: ILineItem[];
}