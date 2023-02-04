import { Injectable, Logger } from '@nestjs/common';
import { IUser } from '@shared/types/user.types';
import { FactoryService } from '../factory/factory.service';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    readonly factoryService: FactoryService
  ) {}

  async getUserByPhoneOrUsername(info: string): Promise<UserDocument> {
    try {
      const [user] = await this.factoryService.getAllDocuments({
        $or: [
          { username: info },
          { phone: info },
        ],
        project: '+password'
      });
      return user;
    } catch (er) {
      Logger.error(er, 'UserService:getUserByPhoneOrUsername');
      return {} as UserDocument;
    }
  }

  getUser(userId: string) {
    return this.factoryService.getDocument<UserDocument>(userId);
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
