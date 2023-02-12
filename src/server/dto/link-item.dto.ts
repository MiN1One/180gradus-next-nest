import { LocaleRecord } from "@shared/types/locale.types";
import { Type } from "class-transformer";
import { IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocaleRecordDto } from "./locale.dto";

export class LinkItemDto {
  @IsString()
  @IsOptional()
  value?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  label: LocaleRecord;

  @IsString()
  url: string;
}