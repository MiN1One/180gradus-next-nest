import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import AppConfig from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './modules/view/view.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from './modules/device/device.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';
import { SettingsModule } from './modules/shop/settings.module';

declare const module: any;

@Module({})
export class AppModule {
  static register(): DynamicModule {
    let mongooseModule = module?.hot?.data?.mongooseModule;
    if (!mongooseModule) {
      mongooseModule = MongooseModule.forRootAsync({
        useFactory: (config: ConfigType<typeof AppConfig>) => ({
          uri: config.dbConnection,
        }),
        inject: [AppConfig.KEY]
      });
      if (module.hot) {
        module.hot.dispose((data: any) => {
          data.mongooseModule = mongooseModule;
        });
      }
    }

    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          load: [AppConfig]
        }),
        mongooseModule,
        ViewModule,
        AuthModule,
        UserModule,
        ProductModule,
        OrderModule,
        DeviceModule,
        UploadModule,
        SettingsModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }
  }
}
