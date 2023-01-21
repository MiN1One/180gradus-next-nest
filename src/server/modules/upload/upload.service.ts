import {
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import AppConfig from "@server/app.config";
import { IFile, IImage, IMAGE_QUALITIES } from "@shared/types/common.types";
import * as sharp from 'sharp';
import { join } from 'path';
import { createDir, removeDir } from "@server/utils/fs.utils";

@Injectable()
export class UploadService {
  saveDir: string;

  constructor(
    @Inject(AppConfig.KEY)
    readonly appConfig: ConfigType<typeof AppConfig>,
  ) {
    this.saveDir = join(process.cwd(), '/', this.appConfig.filesSaveDir);

    createDir(this.saveDir);
    createDir(this.saveDir + this.appConfig.imagesSaveSubpath);
  }

  async compressImages(image: IFile, path: string): Promise<IImage[]> {
    try {
      const imageLocations: IImage[] = [];
      const [_, extension] = image.name.split('.');
      console.log(extension);
      const originalName = image.name.replace('.' + extension, '');

      const sharpInstance = sharp(image.data);
      const metadata = await sharpInstance.metadata();

      imageLocations.push({
        src: path + `${originalName}.jpeg`,
        width: metadata.width,
        height: metadata.height,
      });

      const fileAbsoluteDir = this.saveDir + path;
      createDir(fileAbsoluteDir);

      const promises = Object.entries(IMAGE_QUALITIES).map(
        async ([key, quality]) => {
          const appendix = key === 'master' ? '' : `_${key}`;
          const fileName = `${originalName}${appendix}.jpeg`;
          return sharpInstance
            .toFormat('jpeg', { quality: quality })
            .toFile(fileAbsoluteDir + fileName);
        }
      );

      await Promise.all(promises);
      return imageLocations;
    } catch (er) {
      Logger.error(er, 'UploadService:compressImages');
      return [];
    }
  }

  async uploadImages(files: IFile[], subpath?: string) {
    try {
      let path = this.appConfig.imagesSaveSubpath + '/';
      if (subpath) {
        path += `${subpath}/`;
        await removeDir(this.saveDir + path);
      }
      const promises = files.map(file => (
        this.compressImages(file, path))
      );
      const fileLocations = (await Promise.all(promises)).flat();
      return fileLocations;
    } catch (er) {
      Logger.error(er, 'UploadService:uploadImages');
      return [];
    }
  }
}