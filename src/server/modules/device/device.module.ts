import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FactoryModule } from '../factory/factory.module';
import { DeviceController } from './device.controller';
import { Device, DeviceSchema } from './device.schema';
import { DeviceService } from './device.service';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [
    FactoryModule.forFeatureAsync({
      useFactory: (model: Model<any>) => ({ model }),
      imports: [
        MongooseModule.forFeature([{
          name: Device.name,
          schema: DeviceSchema
        }]),
      ],
      inject: [getModelToken(Device.name)]
    })
  ]
})
export class DeviceModule {}
