import { localeKeys, LocaleTypes } from "@shared/types/locale.types";

export const normalizeLocaleObject = (obj: object, locale: LocaleTypes) => {
  if (typeof obj !== 'object') {
    return;
  }
  for (let key in obj) {
    if (key === 'localeContent') {
      obj[key] = obj[key][locale];
    }
    if (typeof obj[key] === 'object') {
      normalizeLocaleObject(obj[key], locale);
    }
  }
  return obj;
};