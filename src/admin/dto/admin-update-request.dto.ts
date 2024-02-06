import { IsNumber } from "class-validator";
import { AdminEntity } from "../repository/admin.entity";
import { AdminCreateRequest } from "./admin-request.dto";

export class AdminUpdateRequest extends AdminCreateRequest {
  @IsNumber()
  public id: number;
  
  public static toEntity(request:AdminCreateRequest): AdminEntity {
    const entity = new AdminEntity();
    return entity;
  }
}
