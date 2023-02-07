import { IInterfaceSettings } from "@shared/types/shop.types";
import { IsOptional, IsString } from "class-validator";

export class ColorsDto implements IInterfaceSettings {
  @IsString()
  colorPrimary: string;

  @IsString()
  colorSecondary: string;

  @IsString()
  colorTertiary: string;

  @IsString()
  bgColorPrimary: string;

  @IsString()
  bgColorSecondary: string;

  @IsString()
  textColorPrimary: string;

  @IsString()
  textColorSecondary: string;

  @IsString()
  @IsOptional()
  textColorSub?: string;

  @IsString()
  colorGreyLight: string;

  @IsString()
  colorGrey: string;

  @IsString()
  colorGreyDark: string;

  @IsString()
  colorDark: string;

  @IsString()
  containerWidth: string;
}