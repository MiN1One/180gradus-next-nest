import { ILocaleString } from "./locale.types";
import { IButton, IImage } from "./settings.types";

export interface IHomeSection<T = ILocaleString> {
  order: number;
  blockTop: IHomeBlock<T>;
  blockBottom: IHomeBlock<T>;
}

export interface IHomeBlock<T = ILocaleString> {
  title: T;
  subtitle?: T;
  imageCover?: IImage | string;
  bgColor?: string;
  bgImage?: string | IImage;
  actions?: IButton<T>[];
}

export interface IHomeHeroData<T = ILocaleString> {
  title: T;
  subtitle?: T;
  actions?: IButton<T>[];
  logo?: string;
}

export interface IHomeData<T = ILocaleString> {
  btns: IButton<T>[];
  hero: IHomeHeroData<T>;
  sections: IHomeSection<T>[];
}