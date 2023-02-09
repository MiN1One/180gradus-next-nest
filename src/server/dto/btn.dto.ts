import { ButtonTypes, IButton } from "@shared/types/shop.types";
import { IsOptional, IsString } from "class-validator";

export class BtnDto implements IButton {
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsString()
  type: ButtonTypes;
}