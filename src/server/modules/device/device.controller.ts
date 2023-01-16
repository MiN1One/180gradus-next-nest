import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IDevice } from '@shared/types/device.types';
import { DeviceService } from './device.service';

@Controller('api/device')
export class DeviceController {
  constructor(
    readonly deviceService: DeviceService
  ) {}

  @Post()
  createNewDevice(@Body('device') device: IDevice) {
    return this.deviceService.createNewDevice(device);
  }

  @Get()
  getAllDevices(@Query() query: Record<string, string>) {
    return this.deviceService.getDevices(query);
  }

  @Patch('/:id')
  udpateDevice(
    @Param('id') id: string, 
    @Body('device') device: Partial<IDevice>
  ) {
    return this.deviceService.updateDevice(id, device);
  }

  @Delete('/:id')
  deleteDevice(@Param('id') id: string) {
    return this.deviceService.deleteDevice(id);
  }

  @Get('/:id')
  getSingleDevice(@Param('id') id: string) {
    return this.deviceService.getDevice(id);
  }
}
