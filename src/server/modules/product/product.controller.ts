import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@server/guards/auth.guard";
import { LocaleRecord } from "@shared/types/locale.types";
import { IProduct } from "@shared/types/product.types";
import { ProductService } from "./product.service";

@Controller('api/product')
export class ProductController {
  constructor(
    readonly productService: ProductService,
  ) {}

  @Get()
  getAllProducts(@Query() query: Record<string, string>) {
    return this.productService.getProducts(query);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('ADMIN'))
  updateProduct(
    @Param('id') id: string, 
    @Body('product') product: IProduct
  ) {
    return this.productService.updateProduct(id, product);
  }

  @Patch('/translations/:productHandle')
  @UseGuards(AuthGuard('MAINTAINER', 'ADMIN'))
  updateTranslations(
    @Param('productHandle') productHandle: string,
    @Body('translations') translations: LocaleRecord,
  ) {
    return this.productService.saveTranslations(productHandle, translations);
  }

  @Post()
  @UseGuards(AuthGuard('ADMIN'))
  createProduct(
    @Body('product') product: IProduct,
    @Body('translations') translations: LocaleRecord
  ) {
    return this.productService.createProduct(product, translations);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('ADMIN'))
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get('/:id')
  getSingleProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
}