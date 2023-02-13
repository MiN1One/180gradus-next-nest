import { LinkItemDto } from "@server/dto/link-item.dto";
import { LocaleRecordDto } from "@server/dto/locale.dto";
import { ILocaleStringRecord } from "@shared/types/locale.types";
import {
  EItemRoles,
  IStoreSettings,
  IFooterData,
  IGeneralData, IHeaderData,
  ILinkItem,
  ILogo,
  IHeadData
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

class HeaderDataDto implements IHeaderData<ILocaleStringRecord> {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  links: ILinkItem<ILocaleStringRecord>[];

  @IsBoolean()
  showCart: boolean;

  @IsBoolean()
  showFavorites: boolean;

  @IsString()
  logo: string;
}

class FooterDataDto implements IFooterData<ILocaleStringRecord> {
  @IsBoolean()
  showBreadcrumbs: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  socialLinks: ILinkItem<ILocaleStringRecord>[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkItemDto)
  links: ILinkItem<ILocaleStringRecord>[];

  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  copyrightText: ILocaleStringRecord;

  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => LocaleRecordDto)
  additionalText: ILocaleStringRecord;
}

class LogosDto implements ILogo {
  @IsString()
  src: string;

  @IsString()
  role: keyof typeof EItemRoles;
}

class GeneralDataDto implements IGeneralData<ILocaleStringRecord> {
  @IsString()
  company: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LocaleRecordDto)
  description: ILocaleStringRecord;

  @IsString()
  logo?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => LogosDto)
  logos: ILogo[];
}

export class HeadDataDto implements IHeadData<ILocaleStringRecord> {
  @ValidateNested()
  @IsObject()
  @Type(() => HeaderDataDto)
  headerData: IHeaderData<ILocaleStringRecord>;

  @ValidateNested()
  @IsObject()
  @Type(() => FooterDataDto)
  footerData: IFooterData<ILocaleStringRecord>;

  @ValidateNested()
  @IsObject()
  @Type(() => GeneralDataDto)
  generalData: IGeneralData<ILocaleStringRecord>;

  @ValidateNested()
  @IsObject()
  @Type(() => StoreSettingsDto)
  interfaceSettings: IStoreSettings;
}