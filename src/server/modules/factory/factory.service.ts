import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import mongoose, { HydratedDocument, Model } from "mongoose";
import { ApiFeatures } from "../utils/api.utils";
import { FactoryModuleOptions, FACTORY_MODULE_TOKEN } from "./factory.module-definition";

@Injectable()
export class FactoryService {
  model: Model<HydratedDocument<any>>;
  modelName: string;

  constructor(
    @Inject(FACTORY_MODULE_TOKEN)
    factoryModuleOptions: FactoryModuleOptions
  ) {
    this.model = factoryModuleOptions.model;
    this.modelName = this.model.collection.name;
  }

  async getAllDocuments(query: Record<string, string>, ...populate: string[]) {
    try {
      let { mongooseQuery } = new ApiFeatures(this.model.find(), query)
        .limit()
        .project()
        .paginate()
        .filter()
        .search()
        .sort()
        .populate();

      if (populate.length) {
        mongooseQuery = mongooseQuery.populate(populate);
      }

      const documents = await mongooseQuery;
      return documents;
    } catch (er) {
      Logger.error(er, `FactoryService:getAllDocuments:${this.modelName}`);
      return [];
    }
  }

  async getDocument(documentId: string, ...populate: string[]) {
    try {
      let query = this.model.findById(documentId);
      if (populate.length) {
        query = await query.populate(populate);
      }
      const document = await query;
      if (!document) {
        throw new NotFoundException('Document with this id is not found');
      }
      return document;
    } catch (er) {
      Logger.error(er, `FactoryService:getDocument:${this.modelName}`);
      return {};
    }
  }

  async updateDocument(documentId: string, document: Object) {
    try {
      const updatedDocument = await this.model.findByIdAndUpdate(
        documentId,
        document,
        { new: true }
      );
      return updatedDocument;
    } catch (er) {
      Logger.error(er, `FactoryService:updateDocument:${this.modelName}`);
      return {};
    }
  }

  async deleteDocument(documentId: string) {
    try {
      const deletedDocument = await this.model.findByIdAndDelete(documentId);
      if (!deletedDocument) {
        throw new NotFoundException('Document with this id is not found');
      }
    } catch (er) {
      Logger.error(er, `FactoryService:deleteDocument:${this.modelName}`);
    }
    return null;
  }

  async createDocument(document: Object) {
    try {
      const createdDocument = await this.model.create(document);
      await createdDocument.save();
      return createdDocument;
    } catch (er) {
      Logger.error(er, `FactoryService:createDocument:${this.modelName}`);
      return {};
    }
  }
}