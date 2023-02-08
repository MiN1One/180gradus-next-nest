import { Injectable, Logger } from "@nestjs/common";
import { createDir, readJsonFile } from "@server/utils/fs.utils";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { HeadDataDto } from "./dto/head-data.dto";

@Injectable()
export class ShopService {
  private savePath: string;

  constructor() {
    this.savePath = join(process.cwd(), '/public/data');
    createDir(this.savePath);
  }

  async getHeadData() {
    try {
      return readJsonFile(this.savePath + '/shop.json');
    } catch (er) {
      Logger.error(er, 'ShopService:getHeadData');
      return {};
    }
  }

  async getHomeData() {
    try {
      return readJsonFile(this.savePath + '/index.json');
    } catch (er) {
      Logger.error(er, 'ShopService:getHomeData');
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
      Logger.error(er, 'ShopService:saveHeadData');
    }
  }
}