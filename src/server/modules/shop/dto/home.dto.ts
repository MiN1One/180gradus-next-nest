import { BtnDto } from "@server/dto/btn.dto";
import { IHomeData, IHomeSection } from "@shared/types/home.types";
import { IButton, IImage } from "@shared/types/shop.types";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsObject, IsOptional, IsString, MinLength } from "class-validator";

class HomeSectionDto implements IHomeSection {
  @IsNumber()
  order: number;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  imageBg?: string | IImage;

  @IsString()
  @IsOptional()
  imageCover?: string | IImage;

  @IsArray()
  @IsObject({ each: true })
  @Type(() => BtnDto)
  actions: IButton[];
}

export class HomeDto implements IHomeData {
  @IsArray()
  @IsObject({ each: true })
  @Type(() => BtnDto)
  btns: IButton[];

  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @Type(() => HomeSectionDto)
  sections: IHomeSection[];
}