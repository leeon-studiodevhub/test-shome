import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerEntity } from "./repository/customer.entity";
import { CustomerDatabase } from "./repository/customer.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [CustomerService, CustomerController, CustomerDatabase],
  controllers: [CustomerController],
  exports: [CustomerController, CustomerService],
})
export class CustomerModule {}
