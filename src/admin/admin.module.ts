import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminEntity } from "./repository/admin.entity";
import { AdminDatabase } from "./repository/admin.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminService, AdminController, AdminDatabase],
  controllers: [AdminController],
  exports: [AdminController,AdminService],
})
export class AdminModule {}
