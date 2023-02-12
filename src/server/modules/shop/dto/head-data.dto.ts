import { LinkItemDto } from "@server/dto/link-item.dto";
import { LocaleRecordDto } from "@server/dto/locale.dto";
import { LocaleRecord } from "@shared/types/locale.types";
import {
  EItemRoles,
  IStoreSettings,
  IFooterData,
  IGeneralData, IHeaderData,
  ILinkItem,
  ILogo
} from "@shared/types/settings.types";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { StoreSettingsDto } from "./settings-data.dto";

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

class FooterDataDto {
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

  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  copyrightText: LocaleRecord;

  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => LocaleRecordDto)
  additionalText: LocaleRecord;
}

class LogosDto implements ILogo {
  @IsString()
  src: string;

  @IsString()
  role: keyof typeof EItemRoles;
}

class GeneralDataDto {
  @IsString()
  company: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  description: LocaleRecord;

  @IsString()
  logo?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => LogosDto)
  logos: ILogo[];
}

export class HeadDataDto {
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
  @Type(() => StoreSettingsDto)
  interfaceSettings: IStoreSettings;
}