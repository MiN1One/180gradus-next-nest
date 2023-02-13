import { BtnDto } from "@server/dto/btn.dto";
import { LocaleRecordDto } from "@server/dto/locale.dto";
import { IHomeBlock, IHomeData, IHomeHeroData, IHomeSection } from "@shared/types/home.types";
import { ILocaleStringRecord, LocaleRecord } from "@shared/types/locale.types";
import { IButton, IImage } from "@shared/types/settings.types";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class HomeBlockDto implements IHomeBlock<ILocaleStringRecord> {
  @IsArray()
  @IsObject({ each: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => BtnDto)
  actions: IButton<ILocaleStringRecord>[];

  @IsOptional()
  @IsObject()
  @Type(() => LocaleRecordDto)
  subtitle?: ILocaleStringRecord;
  
  @IsObject()
  @Type(() => LocaleRecordDto)
  title: ILocaleStringRecord;

  @IsString()
  @IsOptional()
  imageCover?: string | IImage;

  @IsString()
  @IsOptional()
  bgColor?: string;

  @IsString()
  @IsOptional()
  bgImage?: string | IImage;
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

class HomeHeroDto implements IHomeHeroData<ILocaleStringRecord> {
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => BtnDto)
  actions?: IButton<ILocaleStringRecord>[];

  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  title: ILocaleStringRecord;
  
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  subtitle?: ILocaleStringRecord;
  
  @IsOptional()
  @IsString()
  logo?: string;
}

export class HomeDto implements IHomeData<ILocaleStringRecord> {
  @IsObject()
  @ValidateNested()
  @Type(() => HomeHeroDto)
  hero: IHomeHeroData<ILocaleStringRecord>;

  @IsArray()
  @ValidateNested()
  @IsObject({ each: true })
  @Type(() => BtnDto)
  btns: IButton<ILocaleStringRecord>[];

  @IsArray()
  @ValidateNested()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @Type(() => HomeSectionDto)
  sections: IHomeSection<ILocaleStringRecord>[];
}