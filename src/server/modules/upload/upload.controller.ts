import { Controller, Post, Query } from "@nestjs/common";
import { Files } from "@server/decorators/files.decorator";
import { IFile } from "@shared/types/common.types";
import { UploadService } from "./upload.service";

@Controller('api/upload')
export class UploadController {
  constructor(
    readonly uploadService: UploadService,
  ) {}

  @Post()
  uploadFile(
    @Query('subpath') subpath: string,
    @Files({
      fieldName: 'image',
      mimetype: 'image/'
    }) file: IFile[]
  ) {
    return this.uploadService.uploadImages(file, subpath);
  }
}