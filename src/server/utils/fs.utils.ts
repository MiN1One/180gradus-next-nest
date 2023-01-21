import * as fs from "fs";
import * as rimraf from "rimraf";

export const createDir = (dir: string) => {
  if (fs.existsSync(dir)) {
    return;
  }
  fs.mkdirSync(dir);
};

export const removeDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    return;
  }
  return new Promise((resolve, reject) => {
    rimraf(dir, (er) => {
      if (er) {
        reject(er);
      }
      resolve(dir);
    });
  });
};