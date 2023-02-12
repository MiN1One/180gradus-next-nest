import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { LocaleTypes } from "@shared/types/locale.types";
import { HeadDataDto } from "./dto/head-data.dto";
import { HomeDto } from "./dto/home-data.dto";
import { SettingsService } from "./settings.service";

@Controller('api/settings')
export class SettingsController {
  constructor(
    readonly shopService: SettingsService
  ) {}
  
  @Get()
  getHeadData(
    @Headers('Accept-Language') locale: LocaleTypes
  ) {
    return this.shopService.getHeadData(locale);
  }

  @Post()
  async saveHeadData(@Body('headData') headData: HeadDataDto) {
    await this.shopService.saveHeadData(headData);
    return headData;
  }

  @Get('index') 
  getHomePageData(
    @Headers('Accept-Language') locale: LocaleTypes
  ) {
    return this.shopService.getHomeData(locale);
  }
  
  @Post('index')
  async saveHomeData(@Body('home') homeData: HomeDto) {
    await this.shopService.saveHomeData(homeData);
    return homeData;
  }
}