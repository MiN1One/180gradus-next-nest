import { FastifyReply, FastifyRequest } from "fastify";

export interface MongoDocument {
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export interface IFile {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  mimetype: string;
  md5: string;
  truncated: boolean;
  tempFilePath: string;
  mv: (req: FastifyRequest, res: FastifyReply, next: (er?: any) => void) => void; 
}

export const IMAGE_QUALITIES = {
  low: 60,
  medium: 80,
  master: 100,
};