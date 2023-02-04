export enum ELocales {
  en = 'English',
  ru = 'Русский',
  uz = 'O\'zbek'
}

export type TranslationsRecord = Record<LocaleTypes, string>;

export type LocaleTypes = keyof typeof ELocales;