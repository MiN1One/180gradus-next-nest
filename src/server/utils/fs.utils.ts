import * as fs from "fs";
import { readFile } from "fs/promises";
import * as rimraf from "rimraf";

export const createDir = (dir: string) => {
  const dirExists = fs.existsSync(dir);
  if (dirExists) {
    return true;
  }
  fs.mkdirSync(dir);
  return false;
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

export const readJsonFile = async (filePath: string) => (
  JSON.parse((await readFile(filePath, 'utf-8')) || '{}')
);