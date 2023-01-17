import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FactoryModule } from '../factory/factory.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<any>) => ({ model }),
      inject: [getModelToken(User.name)],
      imports: [
        MongooseModule.forFeature([{
          name: User.name, 
          schema: UserSchema
        }]),
      ]
    }),
  ]
})
export class UserModule {}
