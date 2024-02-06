import { CustomerEntity } from "../repository/customer.entity";
import { CustomerUpdateRequest } from "./customer-update-request.dto";

export class CustomerResponse {
  public id: number;
  public companyName: string;
  public companyEmail: string;
  public companyPhone: string;
  public companyDomain: string;
  public status: Boolean;
  public count?: number;

  public static fromEntity(entity: CustomerResponse): CustomerResponse {
    const response = new CustomerResponse();
    response.id = entity.id;
    response.companyName = entity.companyName;
    response.companyEmail = entity.companyEmail;
    response.companyDomain = entity.companyDomain;
    response.companyPhone = entity.companyPhone;
    response.status = entity.status;
    response.count = entity.count;
    return response;
  }
}
