import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";
import { ApplicationEntity } from "./repository/application.entity";
import { ApplicationDatabase } from "./repository/application.repository";
import { CustomerService } from "../customer/customer.service";
import { CustomerModule } from "../customer/customer.module";
import { TypesenseModule } from "../typesense/typesense.module";

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity]), CustomerModule, TypesenseModule],
  providers: [ApplicationService, ApplicationController, ApplicationDatabase],
  controllers: [ApplicationController],
  exports: [ApplicationController,ApplicationService],
})
export class ApplicationModule {}
