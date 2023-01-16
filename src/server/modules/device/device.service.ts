import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IDevice } from '@shared/types/device.types';
import { Model } from 'mongoose';
import { ApiFeatures } from '../utils/api.utils';
import { Device, DeviceDocument } from './device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name)
    readonly deviceModel: Model<DeviceDocument>,
  ) {}

  async createNewDevice(device: IDevice) {
    try {
      const newDevice = await this.deviceModel.create(device);
      newDevice.save();
      return newDevice;
    } catch (er) {
      Logger.error(er, 'DeviceService:createNewDevice');
      return {};
    }
  }

  async getDevices(query: Record<string, string>) {
    try {
      const { mongooseQuery } = new ApiFeatures(
        this.deviceModel.find(),
        query
      )
        .filter()
        .limit()
        .paginate()
        .sort()
        .project()
        .search();
      
      const devices = await mongooseQuery;
      return devices;
    } catch (er) {
      Logger.error(er, 'DeviceService:getDevices');
      return [];
    }
  }

  async updateDevice(deviceId: string, device: Partial<IDevice>) {
    try {
      const updatedDevice = await this.deviceModel.findByIdAndUpdate(
        deviceId,
        device,
        { new: true }
      );
      return updatedDevice;
    } catch (er) {
      Logger.error(er, 'DeviceService:updateDevice');
      return {};
    }
  }

  async deleteDevice(deviceId: string) {
    try {
      const deleteDevice = await this.deviceModel.findByIdAndDelete(deviceId);
      if (!deleteDevice) {
        throw new NotFoundException('Device with this id is not found');
      }
    } catch (er) {
      Logger.error(er, 'DeviceService:deleteDevice');
    }
    return null;
  }

  async getDevice(deviceId: string) {
    try {
      const device = await this.deviceModel.findById(deviceId);
      if (!device) {
        throw new NotFoundException('Device with this id is not found');
      }
      return device;
    } catch (er) {
      Logger.error(er, 'DeviceSerive:getDevice');
      return {};
    }
  }
}
