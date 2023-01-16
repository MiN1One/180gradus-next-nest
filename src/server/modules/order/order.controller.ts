import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  createOrder(@Body('order') order: IOrder) {
    return this.orderService.createOrder(order);
  }
}
