import { IButton, IImage } from "./shop.types";

export interface IHomeSection {
  title: string;
  subtitle?: string;
  imageBg?: IImage | string;
  imageCover?: IImage | string;
  order: number;
  actions: IButton[];
}

export interface IHomeData {
  btns: IButton[];
  sections: IHomeSection[];
}