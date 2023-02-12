import { LocaleRecord } from "@shared/types/locale.types";
import { ButtonTypes } from "@shared/types/settings.types";
import { Type } from "class-transformer";
import { IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocaleRecordDto } from "./locale.dto";

export class BtnDto {
  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  label: LocaleRecord;

  @IsOptional()
  @IsString()
  url?: string;

  @IsString()
  type: ButtonTypes;
}