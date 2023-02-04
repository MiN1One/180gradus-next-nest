import { LinkItemDto } from "@server/dto/link-item.dto";
import { IFooterData, IGeneralData, IHeadData, IHeaderData, ILinkItem } from "@shared/types/shop.types";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class HeaderDataDto implements IHeaderData {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  links: ILinkItem[];

  @IsBoolean()
  showCart: boolean;

  @IsBoolean()
  showFavorites: boolean;
}

class FooterDataDto implements IFooterData {
  @IsBoolean()
  showBreadcrumbs: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  socialLinks: ILinkItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  links: ILinkItem[];

  @IsString()
  copyrightText: string;

  @IsString()
  @IsOptional()
  additionalText?: string;
}

class GeneralDataDto implements IGeneralData {
  @IsString()
  company: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsString()
  description: string;

  @IsString()
  logo?: string;
}

export class HeadDataDto implements IHeadData {
  @ValidateNested()
  @IsObject()
  @Type(() => HeaderDataDto)
  headerData: IHeadData;

  @ValidateNested()
  @IsObject()
  @Type(() => FooterDataDto)
  footerData: IFooterData;

  @ValidateNested()
  @IsObject()
  @Type(() => GeneralDataDto)
  generalData: IGeneralData;
}