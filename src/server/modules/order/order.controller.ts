import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@server/decorators/user.decorator';
import { AuthGuard } from '@server/guards/auth.guard';
import { IOrder } from '@shared/types/order.types';
import { IUser } from '@shared/types/user.types';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(
    readonly orderService: OrderService
  ) {}

  @Get()
  @UseGuards(AuthGuard('ADMIN', 'MAINTAINER'))
  getOrders() {
    return this.orderService.getAllOrders();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('ADMIN', 'MAINTAINER'))
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Get('/user/:userId')
  @UseGuards(AuthGuard('MAINTAINER', 'ADMIN'))
  getUserOrders(
    @Param('userId') userId: string,
  ) {
    return this.orderService.getOrdersByUserId(userId);  
  }

  @Post()
  @UseGuards(AuthGuard())
  createOrder(
    @Body('order') order: CreateOrderDto,
    @User() user: IUser
  ) {
    return this.orderService.createOrder(order, user._id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('ADMIN', 'MAINTAINER'))
  updateOrder(
    @Param('id') id: string,
    @Body('order') order: Partial<IOrder>
  ) {
    return this.orderService.updateOrder(id, order);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getSingleOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
