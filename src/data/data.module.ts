import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";
import { DataEntity } from "./repository/data.entity";
import { DataDatabase } from "./repository/data.repository";
import { ApplicationService } from "../application/application.service";
import { ApplicationModule } from "../application/application.module";
import { TypesenseModule } from "../typesense/typesense.module";

@Module({
  imports: [TypeOrmModule.forFeature([DataEntity]), ApplicationModule, TypesenseModule],
  providers: [DataService, DataController, DataDatabase],
  controllers: [DataController],
  exports: [DataController,DataService],
})
export class DataModule {}
