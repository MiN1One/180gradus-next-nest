import { Controller, Get, Param } from "@nestjs/common";
import { LOCALE_ROUTES } from "@shared/common/routes";
import { LocalesService } from "./locales.service";

@Controller('api')
export class LocalesController {
  constructor(
    readonly localesService: LocalesService
  ) {}

  // @Get(LOCALE_ROUTES.SINLGE_LOCALE)
  // getSingleLocale(@Param('locale') locale: string) {
  //   return this.localesService.getSingleLocale(locale);
  // }
}