import { ILinkItem } from "@shared/types/shop.types";
import { Transform } from "class-transformer";
import { IsString, ValidateIf } from "class-validator";

export class LinkItemDto implements ILinkItem {
  @IsString()
  @ValidateIf(({ label }) => Boolean(label))
  @Transform(({ obj }) => obj.label.handleize())  
  value?: string;

  @IsString()
  label: string;

  @IsString()
  url: string;
}