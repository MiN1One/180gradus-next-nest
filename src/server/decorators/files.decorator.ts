import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IFile } from "@shared/types/common.types";

interface IFilesDecorParams {
  maxCount?: number;
  fileName?: string;
  mimetype?: string;
  fieldName?: string;
}

const checkFile = (file: IFile, fileKey: string, options: IFilesDecorParams) => {
  const { fileName, fieldName, mimetype } = options;
  if (
    (fileName && file.name !== fileName) ||
    (
      mimetype && 
      !file.mimetype.toLowerCase().startsWith(mimetype.toLowerCase())
    ) || 
    (fieldName && fieldName !== fileKey) 
  ) {
    return null;
  }
  return file;
};

export const Files = createParamDecorator(
  (options: string | IFilesDecorParams, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { files } = request.raw as { files: Record<string, IFile[] | IFile> };
    if (!options) {
      return files;
    }
    const filteredFiles = [];
    for (let fileKey in files) {
      let file = files[fileKey];
      if (typeof options === 'object') {
        if (options.maxCount ?? filteredFiles.length >= options.maxCount) {
          break;
        }
        if (Array.isArray(file)) {
          file = file.map(innerFile => checkFile(innerFile, fileKey, options))
        } else {
          file = checkFile(file, fileKey, options);
        }
        if (file) {
          filteredFiles.push(file);
        }
      } else if (fileKey === options) {
        return file;
      }
    }
    return filteredFiles.flat();
  }
);