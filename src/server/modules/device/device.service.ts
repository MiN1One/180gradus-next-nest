import { Injectable } from '@nestjs/common';
import { IDevice } from '@shared/types/device.types';
import { FactoryService } from '../factory/factory.service';

@Injectable()
export class DeviceService {
  constructor(
    readonly factoryService: FactoryService,
  ) {}

  createNewDevice(device: IDevice) {
    return this.factoryService.createDocument(device);
  }

  getDevices(query: Record<string, string>) {
    return this.factoryService.getAllDocuments(query);
  }

  updateDevice(deviceId: string, device: Partial<IDevice>) {
    return this.factoryService.updateDocument(deviceId, device);
  }

  deleteDevice(deviceId: string) {
    return this.factoryService.deleteDocument(deviceId);
  }

  getDevice(deviceId: string) {
    return this.factoryService.getDocument(deviceId);
  }
}
