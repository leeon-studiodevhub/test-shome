import { IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import { DataEntity } from "../repository/data.entity";

export class DataCreateRequest {
  @IsString()
  public content: string;

  public static toEntity(request:DataCreateRequest): DataEntity {
    const entity = new DataEntity();
    entity.content = request.content;
    entity.status = true;
    entity.createdAt= new Date();
    entity.updatedAt = new Date();
    return entity;
  }
}
