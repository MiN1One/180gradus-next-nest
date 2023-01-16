import { Module } from "@nestjs/common";
import { FactoryConfigurable } from "./factory.module-definition";
import { FactoryService } from "./factory.service";

@Module({
  exports: [FactoryService],
  providers: [FactoryService]
})
export class FactoryModule extends FactoryConfigurable {
}