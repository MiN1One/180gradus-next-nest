import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IOrder } from '@shared/types/order.types';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(
    readonly orderService: OrderService
  ) {}

  @Get()
  getOrders() {
    return this.orderService.getAllOrders();
  }

  @Delete('/:id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Post()
  createOrder(@Body('order') order: IOrder) {
    return this.orderService.createOrder(order);
  }

  @Patch('/:id')
  updateOrder(
    @Param('id') id: string,
    @Body('order') order: Partial<IOrder>
  ) {
    return this.orderService.updateOrder(id, order);
  }

  @Get('/:id')
  getSingleOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
