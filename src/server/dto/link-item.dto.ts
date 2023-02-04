import { ILinkItem } from "@shared/types/shop.types";
import { IsOptional, IsString } from "class-validator";

export class LinkItemDto implements ILinkItem {
  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  label: string;

  @IsString()
  url: string;
}