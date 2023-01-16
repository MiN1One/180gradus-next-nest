import { Injectable } from '@nestjs/common';
import { IOrder } from '@shared/types/order.types';
import { FactoryService } from '../factory/factory.service';

@Injectable()
export class OrderService {

  constructor(
    readonly factoryService: FactoryService,
  ) {}

  getAllOrders() {
    return this.factoryService.getAllDocuments({});
  }

  createOrder(order: IOrder) {
    return this.factoryService.createDocument(order);
  }
}
