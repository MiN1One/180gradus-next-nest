import { BtnDto } from "@server/dto/btn.dto";
import { LocaleRecordDto } from "@server/dto/locale.dto";
import { IHomeBlock, IHomeSection } from "@shared/types/home.types";
import { LocaleRecord } from "@shared/types/locale.types";
import { IButton, IImage } from "@shared/types/settings.types";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class HomeBlockDto {
  @IsArray()
  @IsObject({ each: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => BtnDto)
  actions: IButton[];

  @IsOptional()
  @IsObject()
  @Type(() => LocaleRecordDto)
  subtitle?: LocaleRecord;
  
  @IsOptional()
  @IsObject()
  @Type(() => LocaleRecordDto)
  title?: LocaleRecord;

  @IsString()
  @IsOptional()
  imageCover?: string | IImage;
}

class HomeSectionDto {
  @IsNumber()
  order: number;
  
  @IsObject()
  @ValidateNested()
  @Type(() => HomeBlockDto)
  blockTop: IHomeBlock;
  
  @IsObject()
  @ValidateNested()
  @Type(() => HomeBlockDto)
  blockBottom: IHomeBlock;
}

export class HomeDto {
  @IsArray()
  @ValidateNested()
  @IsObject({ each: true })
  @Type(() => BtnDto)
  btns: IButton[];

  @IsArray()
  @ValidateNested()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @Type(() => HomeSectionDto)
  sections: IHomeSection[];
}