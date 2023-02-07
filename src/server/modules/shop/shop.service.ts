import { Injectable, Logger } from "@nestjs/common";
import { createDir } from "@server/utils/fs.utils";
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
      const buffer = await readFile(`${this.savePath}/shop.json`, 'utf-8');
      return JSON.parse(buffer?.toString());
    } catch (er) {
      Logger.error(er, 'ShopService:getHeadData');
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