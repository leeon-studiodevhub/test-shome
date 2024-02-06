import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CustomerResponse } from "./dto/customer-response.dto";
import { CustomerCreateRequest } from "./dto/customer-request.dto";
import { CustomerDatabase } from "./repository/customer.repository";
import { CustomerUpdateRequest } from "./dto/customer-update-request.dto";
import { CustomersResponse } from "./dto/customers-response.dto";
import { CustomerEntity } from "./repository/customer.entity";
import { Auth } from "aws-sdk/clients/docdbelastic";

@Injectable()
export class CustomerService {
  
  public constructor(private readonly db: CustomerDatabase) {}

  public async createCustomer(customerCreateRequest: CustomerCreateRequest): Promise<CustomerResponse> {
    const toEntity = CustomerCreateRequest.toEntity(
      customerCreateRequest
    );
    
    const createdEntity = await this.db.createCustomer(toEntity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");

    
    return createdEntity;
  }

  public async getCustomers(start: number, limit: number): Promise<CustomerResponse[]> {
    const entities = await this.db.getCustomers(start, limit);
    return entities;
  }

  public async getCustomerById(id: number): Promise<CustomerResponse> {
    const entities = await this.db.getCustomerById(id);
    return CustomerResponse.fromEntity(entities);
  }

  public async getCustomerEntityById(id: number, userId: string): Promise<CustomerEntity> {
    return await this.db.getCustomerByCustomerAndUserId(id, userId);
  }

  public async updateCustomerInfo(
    customerUpdateRequest: CustomerUpdateRequest,
    customerId: number
  ): Promise<CustomerResponse> {
    const entity = CustomerUpdateRequest.toEntity(
      customerUpdateRequest
    );
    const createdEntity = await this.db.updateCustomerInfo(entity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");
    return createdEntity;
  }

  public async updateCustomerPassword(
    customerUpdateRequest: CustomerUpdateRequest,
    customerId: number
  ): Promise<CustomerResponse> {
    const entity = CustomerUpdateRequest.toEntity(
      customerUpdateRequest
    );
    const createdEntity = await this.db.updateCustomerPassword(entity);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");
    return createdEntity;
  }

  public async updateCustomerCount(id: number, count: number): Promise<Boolean> {
    const createdEntity = await this.db.updateCustomerCount(id, count);
    if (!createdEntity)
      throw new InternalServerErrorException("Failed to create the record");
    return createdEntity;
  }

  public async deleteCustomer(id: number): Promise<Boolean> {
    return await this.db.deleteCustomer(id);
  }
}
