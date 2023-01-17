import { Injectable } from '@nestjs/common';
import { IUser } from '@shared/types/user.types';
import { FactoryService } from '../factory/factory.service';

@Injectable()
export class UserService {
  constructor(
    readonly factoryService: FactoryService
  ) {}

  getUser(userId: string) {
    return this.factoryService.getDocument(userId);
  }

  getAllUsers(query: Record<string, string>) {
    return this.factoryService.getAllDocuments(query);
  }

  updateUser(userId: string, user: Partial<IUser>) {
    return this.factoryService.updateDocument(userId, user);
  }

  deleteUser(userId: string) {
    return this.factoryService.deleteDocument(userId);
  }

  createUser(user: IUser) {
    return this.factoryService.createDocument(user);
  }
}
