import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { LocaleTypes } from '@shared/types/locale.types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_HOST,
  withCredentials: true
});

export const fetchData = async <T = any>(
  config: AxiosRequestConfig | string, 
  locale?: LocaleTypes | string
) => {
  try {
    if (locale) {
      let headers = { 'Accept-Language': locale };
      if (typeof config === 'object') {
        config = {
          ...config,
          headers: {
            ...(config.headers || {}),
            ...headers,
          }
        };
      } else {
        config = {
          url: config,
          headers
        };
      }
    }
    const { data } = await axiosInstance(config as AxiosRequestConfig);
    return data as T;
  } catch (er) {
    if (er instanceof AxiosError) {
      console.log('Fetch failed', er.response.data);
      return er.response.data as T;
    }
    return null;
  }
};

export const fetchHeadData = async (
  locale: LocaleTypes | string = 'en',
  ...namespaces: string[]
) => ({
  ...(await serverSideTranslations(locale, ['common', ...namespaces])),
  headData: await fetchData('/api/settings', locale)
});