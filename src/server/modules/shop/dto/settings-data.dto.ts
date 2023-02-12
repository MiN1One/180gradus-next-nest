import { IStoreSettings } from "@shared/types/settings.types";
import { IsOptional, IsString } from "class-validator";

export class StoreSettingsDto implements IStoreSettings {
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