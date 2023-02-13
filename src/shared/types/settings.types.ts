import { ILocaleString } from "./locale.types";

export interface IImage {
  src: string;
  width?: number;
  height?: number;
}

export interface ILinkItem<T = ILocaleString> {
  label: T;
  value?: string;
  url: string;
}

export interface IHeaderData<T = ILocaleString> {
  links: ILinkItem<T>[];
  showCart: boolean;
  showFavorites: boolean;
  logo: string;
}

export interface IFooterData<T = ILocaleString> {
  links: ILinkItem<T>[];
  socialLinks: ILinkItem<T>[];
  copyrightText: T;
  additionalText?: T;
  showBreadcrumbs: boolean;
}

export enum EItemRoles {
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary'
}

export interface ILogo {
  role: keyof typeof EItemRoles;
  src: string;
}

export interface IGeneralData<T = ILocaleString> {
  company: string;
  logo?: string;
  logos: ILogo[];
  description: T;
  email: string;
  phoneNumber: string;
}

export interface IStoreSettings {
  colorPrimary: string;
  colorSecondary: string;
  colorTertiary: string;
  bgColorPrimary: string;
  bgColorSecondary: string;
  textColorPrimary: string;
  textColorSecondary: string;
  textColorSub?: string;
  colorGreyLight: string;
  colorGrey: string;
  colorGreyDark: string;
  colorDark: string;
  containerWidth: string;
}

export interface IHeadData<T = ILocaleString> {
  generalData: IGeneralData<T>;
  headerData: IHeaderData<T>;
  footerData: IFooterData<T>;
  interfaceSettings: IStoreSettings;
}

export enum EButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export type ButtonTypes = keyof typeof EButtonTypes;

export interface IButton<T = ILocaleString> {
  label: T;
  url?: string;
  type: ButtonTypes;
}

