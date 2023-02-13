import { LocaleRecord, ILocaleString } from '@shared/types/locale.types';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';

class LocaleStringDto implements LocaleRecord  {
  @IsString()
  en: string;

  @IsString()
  ru: string;

  @IsString()
  uz: string;
}

export class LocaleRecordDto {
  @ValidateNested()
  @IsObject()
  @Type(() => LocaleStringDto)
  localeContent: string;
}