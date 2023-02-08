import { Body, Controller, Get, Post } from "@nestjs/common";
import { IHeadData } from "@shared/types/shop.types";
import { HeadDataDto } from "./dto/head-data.dto";
import { ShopService } from "./shop.service";

@Controller('api/shop')
export class ShopController {
  constructor(
    readonly shopService: ShopService
  ) {}
  
  @Get()
  getHeadData() {
    return this.shopService.getHeadData();
  }

  @Post()
  async saveHeadData(@Body('headData') headData: HeadDataDto) {
    await this.shopService.saveHeadData(headData);
    return headData;
  }

  @Get('index') 
  getHomePageData() {
    return this.shopService.getHomeData();
  }
}