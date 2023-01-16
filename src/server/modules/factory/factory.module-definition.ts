import { ConfigurableModuleBuilder } from "@nestjs/common";
import { Model } from "mongoose";

export interface FactoryModuleOptions<DocumentType = any> {
  model: Model<DocumentType>;
}

export const {
  ConfigurableModuleClass: FactoryConfigurable,
  MODULE_OPTIONS_TOKEN: FACTORY_MODULE_TOKEN,
  ASYNC_OPTIONS_TYPE: FACTORY_ASYNC_OPTIONS
} = new ConfigurableModuleBuilder<FactoryModuleOptions>()
  .setClassMethodName('forFeature')
  .build();