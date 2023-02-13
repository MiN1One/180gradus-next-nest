export enum ELocales {
  en = 'English',
  ru = 'Русский',
  uz = 'O\'zbek'
}

export interface ILocaleString {
  localeContent: string;
}

export interface ILocaleStringRecord {
  localeContent: LocaleRecord;
}

export type LocaleTypes = keyof typeof ELocales;

export const localeKeys = Object.keys(ELocales);

export const localesLength = localeKeys.length;

export type LocaleRecord = Record<LocaleTypes, string>;