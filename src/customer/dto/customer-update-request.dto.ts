import { IsNumber } from "class-validator";
import { CustomerEntity } from "../repository/customer.entity";
import { CustomerCreateRequest } from "./customer-request.dto";

export class CustomerUpdateRequest extends CustomerCreateRequest {
  @IsNumber()
  public id: number;
  
  public static toEntity(request:CustomerCreateRequest): CustomerEntity {
    const entity = new CustomerEntity();
    return entity;
  }
}
