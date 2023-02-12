import { ILocaleString } from "./locale.types";
import { IButton, IImage } from "./settings.types";

export interface IHomeSection {
  order: number;
  blockTop: IHomeBlock;
  blockBottom: IHomeBlock;
}

export interface IHomeBlock {
  title: ILocaleString;
  subtitle?: ILocaleString;
  imageCover?: IImage | string;
  actions?: IButton[];
}

export interface IHomeData {
  btns: IButton[];
  sections: IHomeSection[];
}