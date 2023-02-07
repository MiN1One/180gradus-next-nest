import { LinkItemDto } from "@server/dto/link-item.dto";
import {
  EItemRoles,
  IInterfaceSettings,
  IFooterData,
  IGeneralData,
  IHeadData,
  IHeaderData,
  ILinkItem,
  ILogo
} from "@shared/types/shop.types";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { ColorsDto } from "./colots.dto";

class HeaderDataDto implements IHeaderData {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  links: ILinkItem[];

  @IsBoolean()
  showCart: boolean;

  @IsBoolean()
  showFavorites: boolean;

  @IsString()
  logo: string;
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

class LogosDto implements ILogo {
  @IsString()
  src: string;

  @IsString()
  role: keyof typeof EItemRoles;
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

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => LogosDto)
  logos: ILogo[];
}

export class HeadDataDto implements IHeadData {
  @ValidateNested()
  @IsObject()
  @Type(() => HeaderDataDto)
  headerData: IHeaderData;

  @ValidateNested()
  @IsObject()
  @Type(() => FooterDataDto)
  footerData: IFooterData;

  @ValidateNested()
  @IsObject()
  @Type(() => GeneralDataDto)
  generalData: IGeneralData;

  @ValidateNested()
  @IsObject()
  @Type(() => ColorsDto)
  interfaceSettings: IInterfaceSettings;
}