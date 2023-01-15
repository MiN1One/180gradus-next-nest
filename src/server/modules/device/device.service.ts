import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IDevice } from '@shared/types/device.types';
import { Model } from 'mongoose';
import { catchAsync } from '../utils/api.utils';
import { Device, DeviceDocument } from './device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name)
    readonly deviceModel: Model<DeviceDocument>,
  ) {}

  async createNewDevice(device: IDevice) {
    return catchAsync(async () => {
      const newDevice = await this.deviceModel.create(device);
      await newDevice.save();
      return newDevice;
    }, {} , 'DeviceService:createNewDevice');
  }

  async getDevices() {
    this.deviceModel.find()
  }
}
