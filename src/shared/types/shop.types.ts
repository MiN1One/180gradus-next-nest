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
}

export interface IFooterData {
  links: ILinkItem[];
  socialLinks: ILinkItem[];
  copyrightText: string;
  additionalText?: string;
  showBreadcrumbs: boolean;
}

export interface IGeneralData {
  company: string;
  logo?: string;
  description: string;
  email: string;
  phoneNumber: string;
}

export interface IHeadData {
  generalData: IGeneralData;
  headerData: IHeadData;
  footerData: IFooterData;
}