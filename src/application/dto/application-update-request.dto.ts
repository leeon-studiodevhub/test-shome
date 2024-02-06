import { IsNumber } from "class-validator";
import { ApplicationEntity } from "../repository/application.entity";
import { ApplicationCreateRequest } from "./application-request.dto";

export class ApplicationUpdateRequest extends ApplicationCreateRequest {
  @IsNumber()
  public id: number;
  
  public static toEntity(request:ApplicationCreateRequest): ApplicationEntity {
    const entity = new ApplicationEntity();
    return entity;
  }
}
