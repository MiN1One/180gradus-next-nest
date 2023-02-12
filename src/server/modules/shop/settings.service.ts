import { Injectable, Logger } from "@nestjs/common";
import { createDir, readJsonFile } from "@server/utils/fs.utils";
import { LocaleTypes } from "@shared/types/locale.types";
import { normalizeLocaleObject } from "@shared/utils/locale.utils";
import { writeFile } from "fs/promises";
import { join } from "path";
import { HeadDataDto } from "./dto/head-data.dto";
import { HomeDto } from "./dto/home-data.dto";

@Injectable()
export class SettingsService {
  private savePath: string;

  constructor() {
    this.savePath = join(process.cwd(), '/public/data');
    createDir(this.savePath);
  }

  async getHeadData(locale: LocaleTypes) {
    try {
      return normalizeLocaleObject(
        await readJsonFile(this.savePath + '/shop.json'),
        locale
      );
    } catch (er) {
      Logger.error(er, 'SettingsService:getHeadData');
      return {};
    }
  }

  async saveHomeData(homeData: HomeDto) {
    try {
      await writeFile(
        this.savePath + '/index.json', 
        JSON.stringify(homeData)
      );
    } catch (er) {
      Logger.error(er, 'SettingsService:saveHomeData');
    }
  }

  async getHomeData(locale: LocaleTypes = 'en') {
    try {
      return normalizeLocaleObject(
        await readJsonFile(this.savePath + '/index.json'),
        locale
      );
    } catch (er) {
      Logger.error(er, 'SettingsService:getHomeData');
      return {};
    }
  }

  async saveHeadData(data: HeadDataDto) {
    try {
      await writeFile(
        `${this.savePath}/shop.json`, 
        JSON.stringify(data)
      );
    } catch (er) {
      Logger.error(er, 'SettingsService:saveHeadData');
    }
  }
}