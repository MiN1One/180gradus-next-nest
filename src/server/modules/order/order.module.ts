import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema }
    ])
  ]
})
export class OrderModule {}
