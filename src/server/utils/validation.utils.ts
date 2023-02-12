import { ELocales, LocaleRecord } from '@shared/types/locale.types';

interface ILocaleValidation {
  error: string | Error;
}

export const validateLocaleKeys = (
  payload: LocaleRecord
): (ILocaleValidation | LocaleRecord) => {
  if (typeof payload === 'string') {
    payload = JSON.parse(payload);
  }
  for (let key in ELocales) {
    if (!(key in payload)) {
      return { error: `${key.toUpperCase()} does not exist` };
    }
  }
  return payload;
};