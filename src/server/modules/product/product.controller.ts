import { Body, Controller, Delete, Get, Param, Patch, Query } from "@nestjs/common";
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
  updateProduct(
    @Param('id') id: string, 
    @Body('product') product: IProduct
  ) {
    return this.productService.updateProduct(id, product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get('/:id')
  getSingleProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
}