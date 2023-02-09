export interface IImage {
  src: string;
  width?: number;
  height?: number;
}

export interface ILinkItem {
  label: string;
  value?: string;
  url: string;
}

export interface IHeaderData {
  links: ILinkItem[];
  showCart: boolean;
  showFavorites: boolean;
  logo: string;
}

export interface IFooterData {
  links: ILinkItem[];
  socialLinks: ILinkItem[];
  copyrightText: string;
  additionalText?: string;
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

export interface IGeneralData {
  company: string;
  logo?: string;
  logos: ILogo[];
  description: string;
  email: string;
  phoneNumber: string;
}

export interface IInterfaceSettings {
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

export interface IHeadData {
  generalData: IGeneralData;
  headerData: IHeaderData;
  footerData: IFooterData;
  interfaceSettings: IInterfaceSettings;
}

export enum EButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export type ButtonTypes = keyof typeof EButtonTypes;

export interface IButton {
  label: string;
  url?: string;
  type: ButtonTypes;
}

