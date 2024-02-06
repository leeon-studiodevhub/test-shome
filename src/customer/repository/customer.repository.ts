import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerCreateRequest } from "../dto/customer-request.dto";
import { CustomerResponse } from "../dto/customer-response.dto";
import { CustomerEntity } from "./customer.entity";

@Injectable()
export class CustomerDatabase {
  public constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>
  ) { }

  public async getCustomerById(customerId: number): Promise<CustomerEntity> {
    return await this.repository.findOneByOrFail({
      id: customerId
    });
  }

  public async getCustomerByCustomerAndUserId(customerId: number, userId: string): Promise<CustomerEntity> {
    return await this.repository.findOneByOrFail({
      id: customerId,
      userId
    });
  }

  public async getCustomers(start: number, limit: number): Promise<CustomerEntity[]> {
    return await this.repository.find({
      order: {
        createdAt: "DESC",
      },
      skip: start,
      take: limit
    });
  }

  public async createCustomer(customerRequest: CustomerEntity): Promise<CustomerEntity> {
    const insertThreadResult = await this.repository.insert(customerRequest);
    customerRequest.id = insertThreadResult.identifiers[0].id;
    return customerRequest;
  }

  public async deleteCustomer(id: number): Promise<Boolean> {
    const updateResult: any = await this.repository.delete({
      id: id
    });
    return updateResult.affected !== undefined && updateResult.affected > 0;
  }

  public async updateCustomerInfo(customerRequest: CustomerEntity): Promise<CustomerEntity> {
    const updateResult = await this.repository.update(
      { id: customerRequest.id },
      { 
        companyEmail: customerRequest.companyEmail,
        companyDomain: customerRequest.companyDomain,
        companyName: customerRequest.companyName,
        companyPhone: customerRequest.companyPhone
      }
    );

    return customerRequest;
  }

  public async updateCustomerPassword(customerRequest: CustomerEntity): Promise<CustomerEntity> {
    const updateResult = await this.repository.update(
      { id: customerRequest.id },
      { 
        password: customerRequest.password
      }
    );

    return customerRequest;
  }

  public async updateCustomerCount(id: number, count: number): Promise<boolean> {
    const updateResult = await this.repository.update(
      { id: id },
      { count: count }
    );
    return true;
  }
}
