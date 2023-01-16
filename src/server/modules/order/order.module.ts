import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FactoryModule } from '../factory/factory.module';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<any>) => ({ model }),
      inject: [getModelToken(Order.name)],
      imports: [
        MongooseModule.forFeature([
          { name: Order.name, schema: OrderSchema }
        ])
      ]
    }),
  ]
})
export class OrderModule {}
