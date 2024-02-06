import { IsNumber } from "class-validator";
import { DataEntity } from "../repository/data.entity";
import { DataCreateRequest } from "./data-request.dto";

export class DataUpdateRequest extends DataCreateRequest {
  @IsNumber()
  public id: number;
  
  public static toEntity(request:DataUpdateRequest): DataEntity {
    const entity = new DataEntity();
    return entity;
  }
}
