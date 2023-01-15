import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceController } from './device.controller';
import { Device, DeviceSchema } from './device.schema';
import { DeviceService } from './device.service';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema }
    ]),
  ]
})
export class DeviceModule {}
