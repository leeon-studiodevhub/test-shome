import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { AuthMiddleware } from "./auth/auth.middleware";
import { RolesGuard } from "./auth/roles.guard";

import { IS_PROD } from "./util/config";

import { IncomingMessage } from "http";
import { TagModule } from "./tag/tag.module";
import { TypesenseModule } from './typesense/typesense.module';
import { TagEntity } from "./tag/repository/tag.entity";
import { AdminEntity } from "./admin/repository/admin.entity";
import { CustomerEntity } from "./customer/repository/customer.entity";
import { ApplicationEntity } from "./application/repository/application.entity";
import { DataEntity } from "./data/repository/data.entity";
import { CustomerModule } from "./customer/customer.module";
import { ApplicationModule } from "./application/application.module";
import { DataModule } from "./data/data.module";
import { AdminModule } from "./admin/admin.module";
import { CustomerService } from "./customer/customer.service";
import { ApplicationService } from "./application/application.service";
import { TypesenseService } from "./typesense/typesense.service";

const REQUEST_ID_HEADER = "x-request-id";

const commonDbConfigs: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  synchronize: true,
  logging: true,
};

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: IS_PROD ? "debug" : "info",
        transport: undefined,
        genReqId: (req: IncomingMessage) => {
          const requestIdHeader = req.headers[REQUEST_ID_HEADER];
          return requestIdHeader ? requestIdHeader : uuid();
        },
        serializers: {
          req: (req: IncomingMessage) => ({
            id: req.id,
            method: req.method,
            url: req.url,
          }),
          res: (res: IncomingMessage) => ({
            statusCode: res.statusCode,
          }),
        },
      },
    }),
    TypeOrmModule.forRoot({
      ...commonDbConfigs,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      autoLoadEntities: true
    }),
    CustomerModule,
    ApplicationModule,
    DataModule,
    TypesenseModule,
    TagModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "main/docs/(.*)", method: RequestMethod.GET },
        { path: "main/public/(.*)", method: RequestMethod.ALL },
        { path: "main/docs-json", method: RequestMethod.GET },
        { path: "customer/signup", method: RequestMethod.POST }
      )
      // need to make sure we don't include OPTIONS otherwise preflight CORs requests will have require authentication
      .forRoutes(
        { path: "/*", method: RequestMethod.POST },
        { path: "/*", method: RequestMethod.PUT },
        { path: "/*", method: RequestMethod.GET },
        { path: "/*", method: RequestMethod.DELETE }
      );
  }

  
}
