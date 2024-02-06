import { AdminEntity } from "../repository/admin.entity";
import { AdminUpdateRequest } from "./admin-update-request.dto";

export class AdminResponse {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public status: Boolean;
  public count?: number;

  public static fromEntity(entity: AdminResponse): AdminResponse {
    const response = new AdminResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.email = entity.email;
    response.phone = entity.phone;
    response.status = entity.status;
    response.count = entity.count;
    return response;
  }
}
