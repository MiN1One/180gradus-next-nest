import { Injectable } from '@nestjs/common';
import { IOrder } from '@shared/types/order.types';
import { IProduct } from '@shared/types/product.types';
import { FactoryService } from '../factory/factory.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {

  constructor(
    readonly factoryService: FactoryService,
    readonly productService: ProductService,
  ) {}

  getAllOrders() {
    return this.factoryService.getAllDocuments({});
  }

  private async calculateTotals(order: CreateOrderDto) {
    const lineItemsMap: Record<string, {
      quantity: number;
      product?: IProduct;
    }> = {};
    const productIds = order.lineItems.map(item => {
      lineItemsMap[item.product as string] = {
        quantity: item.quantity
      }
      return item.product as string;
    });
    const products = await this.productService.getProductsByIds(...productIds);
    let totalPrice = 0;
    console.log({ products })
    for (const product of products) {
      lineItemsMap[product._id] = {
        ...lineItemsMap[product._id],
        product
      };
      totalPrice += product.price;
    }
    return {
      totalPrice,
      lineItemsMap
    };
  }

  async createOrder(order: CreateOrderDto, userId: string) {
    const { totalPrice } = await this.calculateTotals(order);
    return this.factoryService.createDocument<IOrder>({
      ...order,
      subtotalPrice: 0,
      user: userId,
      totalPrice,
    });
  }

  getOrdersByUserId(userId: string) {
    return this.factoryService.getAllDocuments({ user: userId })
  }

  deleteOrder(orderId: string) {
    return this.factoryService.deleteDocument(orderId);
  }

  updateOrder(orderId: string, order: Partial<IOrder>) {
    return this.factoryService.updateDocument(orderId, order);
  }

  getOrder(orderId: string) {
    return this.factoryService.getDocument(orderId);
  }
}
