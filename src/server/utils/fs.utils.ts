import * as fs from "fs";

export const createDir = (dir: string) => {
  if (fs.existsSync(dir)) {
    return;
  }
  fs.mkdirSync(dir);
};